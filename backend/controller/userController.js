const User = require('../models/userModel')
const jwt = require('jsonwebtoken')


//jwt will expire in 3days
const createToken = (id) => {
    return jwt.sign({_id:id,},process.env.SECRET,{expiresIn: '3d'})
}

//login User
const loginUser = async (req, res) => {
    const {email, password} = req.body

    try{
        const user = await User.login(email, password)

        //create a jwt token
        const token = createToken(user._id)

        res.status(200).json({email,token})
    }catch(error){
        res.status(400).json({error:error.message})
    }
}


//Signup user
const signupUser = async (req, res) => {
    const {email, password} = req.body

    try{
        const user = await User.signup(email, password)

        //create a jwt token
        const token = createToken(user._id)

        res.status(200).json({email,token})
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

module.exports = {loginUser,signupUser}
