const express = require('express')
const forecastRoute = require('./src/controllers/ForecastController')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())
app.use('/', forecastRoute)



module.exports = app