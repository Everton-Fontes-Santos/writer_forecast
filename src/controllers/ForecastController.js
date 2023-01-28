const express = require('express')
const { Forecast } = require('../models')
const forecastRoute = express.Router()

forecastRoute.get('/all' ,async (req, res)=>{
    const allForecast = await forecast.getAllForecast()
    if(!allForecast) return res.status(404).json({
        message:'Not Have any Forecast'
    })

    return res.status(200).json({
        forecasts: allForecast
    })
})






module.exports = forecastRoute