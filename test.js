const Forecast = require('./src/models/Forecast')
const mongoose = require('mongoose')
require('dotenv').config()
mongoose.set('strictQuery', true)
mongoose.connect(process.env.MONGO_URL,()=>{
    create()
})


const MockForecast = {
    value: 1.00870,
    prev_value: 1.00770,
    last_close: 1.09250,
    date:new Date(),
    timeframe: 'm15'
}

const forecast = new Forecast()

const create= async ()=>{
    console.log(await forecast.getAllForecast())
    const created = await forecast.createForecast(MockForecast)
    console.log(`Created : ${created}`)
    console.log(forecast.errors)
    MockForecast.last_close = 1.09255
    const edited = await forecast.editForecast(MockForecast)
    console.log(`Edited: ${edited}`)
    console.log(forecast.errors)
    const geted = await forecast.getForecastByDate(edited.date)
    console.log(`Geted: ${geted}`)
    console.log(forecast.errors)
    const delited = await forecast.deleteForecastByDate(geted.date)
    console.log(`delited: ${delited}`)
    console.log(forecast.errors)
}