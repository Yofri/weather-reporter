const nodemailer = require('nodemailer');


class Mail {
  constructor(emailTujuan) {
    this.emailTujuan = emailTujuan
  }

  send(){
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'fase1.pair@gmail.com',
        pass:  process.env.SECRET_MAIL
      }
    });

    const mailOptions = {
      from   : 'fase1.pair@gmail.com', // sender address
      to     : this.emailTujuan, // list of receivers
      subject: 'This is your weather today!!', // Subject line
      html   : `
                <p> this weather todays </p>
                <a href="google.com"> For more information </a>
                `// plain text body
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if(err)
        console.log(err)
      else
        console.log(info);
    });

  }
}

let mail = new Mail('angrha@gmail.com')
mail.send()
module.exports = Mail;
