require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const mongoose = require('mongoose')
const userRoute = require('./routes/user_route')
const authenticationRoute = require('./routes/authentication_route')
const billRoute = require('./routes/bill_route')

mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 30000, // 30 seconds
    socketTimeoutMS: 45000, // 45 seconds
}).then(() => {
    console.log('Connected to MongoDB successfully')
}).catch((err) => {
    console.error('MongoDB connection error:', err)
    process.exit(1)
})

const db = mongoose.connection;
db.on('error', (err) => { 
    console.log('MongoDB connection error:', err) 
})
db.on('open', () => { 
    console.log('MongoDB connection opened')
})
db.on('disconnected', () => {
    console.log('MongoDB disconnected')
})

app.use(express.json())
app.use(cors())
app.use('/users', userRoute)
app.use('/auth', authenticationRoute)
app.use('/bills', billRoute)
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});