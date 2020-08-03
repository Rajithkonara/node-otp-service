const emailRegex = new RegExp('^[\\w-_.+]*[\\w-_.]@([\\w]+\\.)+[\\w]+[\\w]$')
const mobileNoRegex = new RegExp('^\\+(\\d{1,5})\\d{6,14}$')

function isValidEmail(email) {
    return emailRegex.test(String(email).toLowerCase())
}

function isValidMobileNo(mobileNo) {
    return mobileNoRegex.test(String(mobileNo))
}


module.exports = {
    isValidEmail,
    isValidMobileNo
}