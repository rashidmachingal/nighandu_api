const nodemailer = require('nodemailer');
const dotenv = require("dotenv");
dotenv.config();

//nodemailer config
let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  auth: {
      user: 'therashileo@gmail.com',
      pass: process.env.MAIL_PASS
  }
});

module.exports = {transporter}