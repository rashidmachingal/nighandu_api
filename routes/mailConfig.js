const nodemailer = require('nodemailer');
const dotenv = require("dotenv");
dotenv.config();

//nodemailer config
let transporter = nodemailer.createTransport({
  service: 'Gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: true,
  auth: {
      user: 'therashileo@gmail.com',
      pass: process.env.MAIL_PASS
  }
});

module.exports = {transporter}