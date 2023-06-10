const nodemailer = require('nodemailer');

const sendEmail = (email, subject, text) => {

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'rashileocontact@gmail.com',
      pass: process.env.EMAIL_PASS
    }
  });
  

  const mailOptions = {
    from: 'rashileocontact@gmail.com',
    to: email,
    subject: subject,
    text: text
  };
  
  // Send email
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  
}

module.exports = { sendEmail }