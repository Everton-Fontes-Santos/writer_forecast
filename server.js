const app = require('./app')
const config = require('./config')
const redis = require('redis')
const mongoose = require('mongoose')
const queue = require('./src/queue')
const { saveForecast } = require('./src/utils')

mongoose.set('strictQuery', true)
mongoose.connect(config.MONGO_URL,()=>{
    app.emit('start:ok')
})


app.on('start:ok',async()=>{
    app.listen(config.PORT, async ()=>{
        queue.subscribe(config.CHANNEL_FORECAST, saveForecast)
        console.log(`Listening on http://localhost:${config.PORT}`)
    })
})