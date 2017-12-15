const nodemailer = require('nodemailer');

class Mail {
  constructor(emailTujuan, weather) {
    this.emailTujuan = emailTujuan
    this.icon        = weather.icon
    this.summary     = weather.summary
    this.latitude    = weather.latitude
    this.longitude   = weather.longitude
    this.time        = weather.time || new Date()
  }

  send(){
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'weatherest.app@gmail.com',
        pass: process.env.SECRET_MAIL
      }
    });

    const mailOptions = {
      from   : 'weatherest.app@gmail.com',
      to     : this.emailTujuan, 
      subject: 'Your Weathers Detail' ,
      html   : `
      <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml" 
       xmlns:v="urn:schemas-microsoft-com:vml"
       xmlns:o="urn:schemas-microsoft-com:office:office">
      <head>
      
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1"> 
        <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
        <meta name="format-detection" content="date=no"> 
        <meta name="format-detection" content="telephone=no">
        <title>Today's Weather</title>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet">
        <style type="text/css">
      body {
        margin: 0;
        padding: 0;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
      }
      
      table {
        border-spacing: 0;
      }
      
      table td {
        border-collapse: collapse;
      }
      
      .ExternalClass {
        width: 100%;
      }
      
      .ExternalClass,
      .ExternalClass p,
      .ExternalClass span,
      .ExternalClass font,
      .ExternalClass td,
      .ExternalClass div {
        line-height: 100%;
      }
      
      .ReadMsgBody {
        width: 100%;
        background-color: #ebebeb;
      }
      
      table {
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
      }
      
      img {
        -ms-interpolation-mode: bicubic;
      }
      
      .yshortcuts a {
        border-bottom: none !important;
      }
      
      @media screen and (max-width: 599px) {
        .force-row,
        .container {
          width: 100% !important;
          max-width: 100% !important;
        }
      }
      @media screen and (max-width: 400px) {
        .container-padding {
          padding-left: 12px !important;
          padding-right: 12px !important;
        }
      }
      .ios-footer a {
        color: #aaaaaa !important;
        text-decoration: underline;
      }
      a[href^="x-apple-data-detectors:"],
      a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
      }
      </style>
      </head>
      
      <body style="margin:0; padding:0;" bgcolor="#F0F0F0" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">
      
      <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0" bgcolor="#F0F0F0">
        <tr>
          <td align="center" valign="top" bgcolor="#F0F0F0" style="background-color: #F0F0F0;">
            <br>
            <table border="0" width="600" cellpadding="0" cellspacing="0" class="container" style="width:600px;max-width:600px">
              <tr>
                <td class="container-padding header" align="left" style="font-family:Helvetica, Arial, sans-serif;font-size:24px;font-weight:bold;padding-bottom:12px;color:#DF4726;padding-left:24px;padding-right:24px">
                  Weather Report Today
                </td>
              </tr>
              <tr>
                <td class="container-padding content" align="left" style="padding-left:24px;padding-right:24px;padding-top:12px;padding-bottom:12px;background-color:#ffffff">
                  <br>
      <canvas id="icon1" width="128" height="128"></canvas>
      <canvas id="icon2" width="128" height="128"></canvas>
      
      <div class="title" style="font-family:Helvetica, Arial, sans-serif;font-size:18px;font-weight:600;color:#374550">${this.icon}, ${this.time}</div>
      <br>
      
      <div class="body-text" style="font-family:Helvetica, Arial, sans-serif;font-size:14px;line-height:20px;text-align:left;color:#333333">
        ${this.summary}.
        <br><br>
      
        Latitude ${this.latitude}, Longitude ${this.longitude}.
        <br><br>
      </div>
      
                </td>
              </tr>
              <tr>
                <td class="container-padding footer-text" align="left" style="font-family:Helvetica, Arial, sans-serif;font-size:12px;line-height:16px;color:#aaaaaa;padding-left:24px;padding-right:24px">
                  <br><br>
                  © 2017 Weather Report, Inc.
                  <br><br>
      
                  <strong>WeatherReport.</strong><br>
                  <span class="ios-footer">
                    Pondok Indah.<br>
                    Jakarta Selatan, 12240<br>
                  </span>
                  <a href="http://www.acme-inc.com" style="color:#aaaaaa">www.acme-inc.com</a><br>
      
                  <br><br>
      
                </td>
              </tr>
            </table>
      
          </td>
        </tr>
      </table>
      
      </body>
      </html>`
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if(err)
        console.log(err)
      else
        console.log(info);
    });

  }
}

module.exports = Mail;
