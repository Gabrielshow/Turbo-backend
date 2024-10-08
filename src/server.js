// server.js
const express = require('express')
const nodemailer = require('nodemailer')

const app = express()

app.post('/api/send-email', (req, res) => {
  const mail = req.body
  const transporter = nodemailer.createTransport({
    host: 'smtp.example.com',
    port: 587,
    secure: false, // or 'STARTTLS'
    auth: {
      user: 'myacreatives82@gmail.com',
      pass: 'vmdlsafsrsbrkmnp'
    }
  })
  const mailOptions = {
    from: 'myacreatives82@gmail.com',
    to: mail.to,
    subject: mail.subject,
    text: mail.body
  }
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error)
    }
    console.log('Email sent: ' + info.response)
    res.json({ message: 'Email sent successfully' })
  })
})

app.listen(3000, () => {
  console.log('Server listening on port 3000')
})
