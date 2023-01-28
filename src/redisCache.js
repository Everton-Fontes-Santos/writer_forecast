const redis = require('redis')
const config = require('../config')

const { host, password, port, user } = config.QUEUE
let client
if(!host){
    client = redis.createClient()
}
else{
    client = redis.createClient({
        socket:{
            host,
            port
        },
        password,
        username:user
        //url: process.env.REDIS_URL
    })
}
client.connect()

module.exports = {
    client
}