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

client.on('error', err => {
    console.log('Error ' + err);
});

async function publish(channel, value) {
    return client.publish(channel, JSON.stringify(value));
}
 
async function subscribe(channelSubscribed, callback) {
    client.subscribe(channelSubscribed, (message, channel) => {
        callback(message);
    });
}
 
module.exports = {
    publish,
    subscribe,
    client
}

