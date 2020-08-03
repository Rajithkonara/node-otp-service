const validator = require('../../src/utils/validator')

test('Should return true if valid email provided', () => {
    const isValid = validator.isValidEmail("test@gmail.com")
    expect(isValid).toBe(true)
})

test('Should return false if invalid email address provided', () => {
    const isValid = validator.isValidEmail('testgmail.com')
    expect(isValid).toBe(false)
})

test('Should return true if valid mobileNo provided', () => {
    const isValid = validator.isValidMobileNo('+94721234123')
    expect(isValid).toBe(true)
})

test('Should return false if invalid mobileNo provided', () => {
    const isValid = validator.isValidMobileNo('072123412D4')
    expect(isValid).toBe(false)
})