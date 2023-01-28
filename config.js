require('dotenv').config()

const PORT = process.env.PORT || 3000
const QUEUE = {
    host:process.env.REDIS_HOST,
    port:process.env.REDIS_PORT,
    password:process.env.REDIS_PASSWORD,
    user:process.env.REDIS_USER
}
const DATABASE = process.env.DATABASE || 'FORECASTFOREX'
const MONGO_PORT = process.env.MONGO_PORT || 27017
const MONGO_URL = process.env.MONGO_URL || `mongodb://localhost:${MONGO_PORT}/${DATABASE}`

const CHANNEL_FORECAST = process.env.CHANNEL_FORECAST || 'forecast'
const CHANNEL_BROADCAST = process.env.CHANNEL_BROADCAST || 'forecast.created'

module.exports = {
    PORT,
    QUEUE,
    DATABASE,
    MONGO_PORT,
    MONGO_URL,
    CHANNEL_FORECAST,
    CHANNEL_BROADCAST
}