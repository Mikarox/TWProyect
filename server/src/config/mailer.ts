import nodemailer = require("nodemailer");

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'GatuBakup@Gmail.com', // google user
      pass: 'fbtnktfphmefvqtz', // generated google password
    },
  });

  transporter.verify().then(({
      console.log('ready for send emails');
  }));