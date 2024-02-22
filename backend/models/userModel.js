const mongoose = require('mongoose')
const bcrypt =  require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    }
})

//static signup method with validation checks
//we can't arrow function while using this keyword
userSchema.statics.signup = async function(email,password) {

    //validation
    if(!email || !password){
        throw Error('Email and password are compulsary')
    }
    if(!validator.isEmail(email)){
        throw Error('Enter a valid email')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Enter a strong password')
    }


    const exists = await this.findOne({ email })

    if(exists) {
        throw Error('Email already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)

    const user = await this.create({ email,password:hash})

    return user
}

//static login method
userSchema.statics.login = async function(email,password) {
    if(!email || !password){
        throw Error('Email and password are compulsary')
    }

    const user = await this.findOne({ email })

    if(!user) {
        throw Error('Incorrect email')
    }
    const match = await bcrypt.compare(password,user.password)

    if(!match){
        throw Error('Incorrect password')
    }
    return user
}


module.exports = mongoose.model('User',userSchema)