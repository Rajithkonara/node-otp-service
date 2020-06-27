const redis = require('redis')

const client = redis.createClient({
    port: 6379,
    host: 'localhost',
    password: 'konara'
})

client.on('connect', () => {
    console.log('Redis connected')
})

client.on('error', (error) => {
    console.log('Something went wrong' + error);
})

module.exports = client