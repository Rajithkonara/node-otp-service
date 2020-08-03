const app = require('../../src/app')
const request = require('supertest')

// test('Should generate otp for valid email address', async() => {
//     const response = await request(app)
//         .post('/api/v1/generate')
//         .send({
//             email: 'test@gmail.com'
//         })
//         .expect(200)        
// })

test('Should return bad request for invalid email address', async() => {
    const response = await request(app)
        .post('/api/v1/generate')
        .send({
            email: 'testgmail.com'
        })
        .expect(400)        
    expect(response.body.error).toBe('Invalid email address')    
})

test('Should return bad request for invalid mobile number', async() => {
    const response = await request(app)
        .post('/api/v1/generate')
        .send({
            mobileNo: '083213245'
        })
        .expect(400)        
    expect(response.body.error).toBe('Invalid mobile number')    
})