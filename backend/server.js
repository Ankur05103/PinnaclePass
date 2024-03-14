require('dotenv').config()
const express = require( 'express')
const mongoose =  require('mongoose')
const userRoutes = require('./routes/user')
const movieRoutes = require('./routes/movie')

//express app
const app = express()

//middleware
app.use(express.json())
app.use((req,res,next) => {
    console.log(req.path, req.method)
    next()
})

//routes 
app.use('/api/user',userRoutes)
app.use('/api/movie',movieRoutes)

//listen for requests
app.get('/', (req,res) => {
    res.json({mssg:'Welcome to home page'})
})

//connect to DB
mongoose.connect(process.env.MONGO_URI) 
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, () => {
        console.log('connected to db & listening on port '+process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })

