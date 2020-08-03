const express = require('express')
const router = new express.Router()
const { getOtp, verfy } = require('../service/otp-service')
const sesClient = require('../service/ses-service')
const validator = require('../utils/validator')


router.post('/api/v1/generate', async (req, res) => {
    try {

        const otpRequest = {
            ...req.body
        }

        if (otpRequest.email != null && otpRequest.mobileNo != null) {
            return res.status(400).send({ error: 'Multiple types are not supported' })
        }

        if (otpRequest.email != null) {
            return sendEmailOtp(otpRequest.email, res)
        } else {
            return sendSmsOtp(otpRequest.mobileNo, res)
        }

        //handle
        return res.status(400).send({ error: 'Required fields are missing' })

    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Error occured while generating otp' })
    }
})

router.post('/api/v1/verify', async (req, res) => {
    try {

        const otpVerifyRequest = {
            ...req.body
        }

        if (otpVerifyRequest.email != null && otpVerifyRequest.mobileNo != null) {
            return res.status(400).send({ error: 'Multiple types are not supported' })
        }

        verfy(req.body.mobileNo, req.body.otp, result => {
            if (result) {
                console.log('indside true', result);

                return res.status(200).json({ message: "verifed successfully" })
            }
            console.log('outside if', result);
            return res.status(400).json({ error: "Invalid otp" })
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({ error: 'Error occured while verifying otp' })
    }
})

/**
 * Sends the otp as email
 * @param {email} email 
 * @param {http response} response 
 */
function sendEmailOtp(email, response) {
    if (validator.isValidEmail(email)) {
        const otp = getOtp(email)
        // sesClient.sendEmail(email, 'From node', 'use below ' + otp, 'rajith.konara@tokoin.io')
        return response.status(200).json({ otp: otp })
    } else {
        return response.status(400).json({ error: 'Invalid email address' })
    }
}

/**
 *  Sends the otp as sms
 * @param {mobileNo} mobileNo 
 * @param {http response} response 
 */
function sendSmsOtp(mobileNo, response) {
    if (validator.isValidMobileNo(mobileNo)) {
        const otp = getOtp(mobileNo)
        // sesClient.sendSms(mobileNo, otp)
        return response.status(200).json({ success: 'otp sent successfully', otp: otp })
    } else {
        return response.status(400).json({ error: 'Invalid mobile number' })
    }
}


module.exports = router