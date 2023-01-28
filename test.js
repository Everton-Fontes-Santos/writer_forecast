const Forecast = require('./src/models/Forecast')
const mongoose = require('mongoose')
require('dotenv').config()
const queue = require('./src/queue')
const config = require('./config')

mongoose.set('strictQuery', true)
mongoose.connect(config.MONGO_URL,()=>{
    create()
    //emit()
})


const MockForecast = {
    value: 1.0677568104590105,
    prev_value: 1.0087,
    last_close: 1.0861,
    timeframe: 'm15',
    date: 1674916200000
  }

const forecast = new Forecast()

const create= async ()=>{
    console.log(await Forecast.getAllForecast())
    const created = await forecast.createForecast(MockForecast)
    console.log(`Created : ${created}`)
    console.log(forecast.errors)
    // MockForecast.last_close = 1.09255
    // const edited = await forecast.editForecast(MockForecast)
    // console.log(`Edited: ${edited}`)
    // console.log(forecast.errors)
    // const geted = await forecast.getForecastByDate(edited.date)
    // console.log(`Geted: ${geted}`)
    // console.log(forecast.errors)
    // const delited = await forecast.deleteForecastByDate(geted.date)
    // console.log(`delited: ${delited}`)
    // console.log(forecast.errors)
}

const emit = async () =>{
    await queue.publish(config.CHANNEL_FORECAST, {
        forecast: 1.08705,
        last_close: 1.97805,
        timeframe:'m15'
    })
}