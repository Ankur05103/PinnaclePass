require('dotenv').config()
const express = require( 'express')
const mongoose =  require('mongoose')
const userRoutes = require('./routes/user')
const movieRoutes = require('./routes/movie')
const theaterRoutes = require('./routes/theater')
const showRoutes = require('./routes/show')
const seatRoutes = require('./routes/seat')

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
app.use('/api/theater',theaterRoutes)
app.use('/api/show',showRoutes)
app.use('/api/seat',seatRoutes)

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

