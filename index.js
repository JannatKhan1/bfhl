const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')

const connectDB = require('./config/db')
const cors = require("cors")
const PORT = process.env.PORT 

//Connect to database
connectDB()
const app = express()


app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())

//Routes
app.use('/api/user/',require('./routes/userRoutes'))

app.listen(PORT,()=>console.log(`Server started on port ${PORT}`))