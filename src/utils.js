const Forecast = require('./models/Forecast')
const redisCache = require('./redisCache')
const queue = require('./queue')
const { CHANNEL_BROADCAST } = require('../config')
const forecastModel = new Forecast()

const createForecastObj = async (message) => {
    const parsedMessage = JSON.parse(message)
    if(!parsedMessage.forecast || !parsedMessage.last_close || !parsedMessage.timeframe) return
    let lastForecast
    lastForecast = JSON.parse(await redisCache.client.get('last_forecast'))
    if(!lastForecast){
        const allForecasts = await Forecast.getAllForecast()
        lastForecast = allForecasts.at(-1)
    }
    
    const date = new Date().setSeconds(0,0)
    return {
        value: parsedMessage.forecast,
        prev_value: lastForecast.value,
        last_close: parsedMessage.last_close,
        timeframe: `m${parsedMessage.timeframe}`,
        date
    }
}

const saveForecast = async (message)=>{
    try{
        const newForecast = await createForecastObj(message)
        const forecast = await forecastModel.createForecast(newForecast)
        await redisCache.client.set('last_forecast', JSON.stringify(forecast))
        return forecast
    }catch(err){
        console.log(err)
    }
}

module.exports = {
    createForecastObj,
    saveForecast
}