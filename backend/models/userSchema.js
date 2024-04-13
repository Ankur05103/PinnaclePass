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
    },
    mobile:{
        type:String,
        required:true,
        unique:true
    }
})

//static signup method with validation checks
//we can't arrow function while using this keyword
userSchema.statics.signup = async function(email,password,mobile,cnfpassword) {

    //validation
    if(!email || !password || !mobile){
        throw Error('Email , password and mobile number are compulsary')
    }
    if(!cnfpassword){
        throw Error('Please add confirm password')
    }
    if(!validator.isEmail(email)){
        throw Error('Enter a valid email')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Enter a strong password')
    }
    if(!validator.isMobilePhone(mobile)){
        throw Error('Wrong mobile phone number')
    }
    if(password != cnfpassword){
        throw Error('Password & confirm pasword is not matching')
    }


    const emailExists = await this.findOne({ email })

    if(emailExists) {
        throw Error('Email already exists')
    }

    const mobileExists = await this.findOne({ mobile })
    if(mobileExists) {
        throw Error('Mobile Number already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)

    const user = await this.create({ email,password:hash,mobile})

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