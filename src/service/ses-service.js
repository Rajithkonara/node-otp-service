// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');

// Set the region 
AWS.config.update({ region: 'ap-southeast-2' });

const ses = new AWS.SES({ apiVersion: '2019-09-27' })

const sendEmail =  (to, subject, Message, from) => {

  const params = {
    Destination: {
      ToAddresses: [to]
    },
    Message: {
      Body: {
        Text: {
          Charset: "UTF-8",
          Data: Message
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: subject
      }
    },
    Source: from,
  };

  ses.sendEmail(params).promise().then(
    function (data) {
      console.log(data.MessageId);
    }).catch(
      function (err) {
        console.error(err, err.stack);
      });

}

const sns = new AWS.SNS({ apiVersion: '2019-09-27' })

const sendSms =  (mobileNo, otp) => {

  const params = {
    MessageAttributes: {
      'AWS.SNS.SMS.SMSType': {
        DataType: 'String',
        StringValue: 'Transactional'
      }
    },
    Message: 'Please ues the following otp ' + otp,
    PhoneNumber: mobileNo
  }
  sns.publish(params).promise().then(
    function (data) {
      console.log(data.MessageId);
    }).catch(
      function (err) {
        console.error(err, err.stack);
      });
}

module.exports = {
  sendEmail,
  sendSms
}
