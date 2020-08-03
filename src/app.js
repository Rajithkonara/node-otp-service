const express = require('express')
const optRouter = require('../src/routes/otp-router')
const app = express()

//parse json
app.use(express.json())

//routes
app.use(optRouter)

module.exports = app