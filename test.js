const client = require('./redis-config')
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

// client.set(1, "one")
// client.expire(1, 3)

//generate otp
const otp = () => {
    return Math.floor(100000 + Math.random() * 900000)
}

var x = otp();

readline.question('Enter Mobile No:', name => {
    client.set(name, x)
    readline.close
})

