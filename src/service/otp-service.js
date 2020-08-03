const client = require('../config/redis-config')

function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000)
}

const getOtp = (mobileNo) => {
    const otp = generateOtp()
    client.set(mobileNo, otp, 'EX', 60, (err, result) => {
        if (err) throw new Error('Error occured while saving the otp')
        console.log("result " + result);
        return result
    })
    return otp
}

function verfy(mobileNo, otp, callback) {

    client.get(mobileNo, (err, result) => {
        console.log("Inside verify " + otp, result);
        if (err) throw new Error('Error occured while verifying the otp')
        if (result === otp) {
            console.log('match found')
            client.del(mobileNo, (err, result) => {
                console.log('insdide  del call', result);
                
                if (err) throw new Error('Error occured while removing the key')
                callback(true)
            })
        } else {
            console.log('service result ',  result);
            callback(false)
        }
    })

    
}




module.exports = {
    getOtp, verfy
}