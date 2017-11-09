const nodemailer = require('nodemailer');

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
module.exports = function(content) {
  // console.log(content.profileEmail);
  nodemailer.createTestAccount((err, account) => {
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
              user: 'xfullx.gamerz@gmail.com', // generated ethereal user
              pass: 'zuu021290'  // generated ethereal password
          }
      });

      // setup email data with unicode symbols
      let mailOptions = {
          from: 'Fox Cinema <xfullx.gamerz@gmail.com>', // sender address
          to: content.profileEmail, // list of receivers
          subject: 'Ticket Detail - Fox Cinema', // Subject line
          // text: `${content}`, // plain text body
          html: `Dear ${content.profileName},<br><br>
          Terima kasih sudah membeli tiket di Fox Cinema.<br>
          Berikut adalah detail pembelian tiket Anda:<br>
          Kode tiket: <b>${content.ticket}</b><br>
          Judul: ${content.movieTitle}<br>
          Time: ${content.movieSchedule} WIB @ ${content.movieStudio}<br>
          Tanggal pembelian: ${new Date(content.buyDate)}<br>
          Harga: Rp${content.ticketPrice}<br><br>
          Tunjukkan <b>kode tiket</b> Anda pada saat datang ke Bioskop. Happy Watching :D` // html body
      };

      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);
          // Preview only available when sending through an Ethereal account
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

          // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
          // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      });
  });
}
