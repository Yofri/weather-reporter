## Email Sender using node mailer

send an email from email server to email user directly when user check the weather from apps.

firstly install nodemailer.
```
npm install --save nodemailer
```

and recuiring nodemailer : 
```
const nodemailer = require('nodemailer');
```

we use Class for sending to email user
### Class Mail
| Parameter | Description |
| ----------- | ----------- |
| emailTujuan | this is email user as reciever, composed from weather controller |
| weather | is an object data weather such as weather, latitude, longitude, coordinate, summary and date |

#### Send() Method

nodemailer needs a transport service using which it can send emails. In this app we use gmail

```
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'weatherest.app@gmail.com',
    pass: process.env.SECRET_MAIL
  }
});
```

and then configuring our email details.
```
const mailOptions = {
    from   : 'weatherest.app@gmail.com',
    to     : this.emailTujuan, 
    subject: 'Your Weathers Detail' ,
    html   : ` <html> `
};
```

last part is sendMail method and take two parts argument (mailOptions and callback function)
```
  transporter.sendMail(mailOptions, function (err, info) {
    if(err)
      console.log(err)
    else
      console.log(info);
  });
```





