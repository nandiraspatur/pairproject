smsGateway = require('sms-gateway-nodejs')('nandirasp@gmail.com', 'book8Nexmo')

module.exports = function(ticket_code, phone_number) {
  let msg = [
    'FoxTicket,',
    'Berikut adalah kode tiket anda :',
    ticket_code,
    'Silakan tunjukan kode tersebut pada saat datang ke Bioskop.',
    'Happy Wacthing :D'
  ]

  let message = msg.join('\n')

  smsGateway.message.sendMessageToNumber('65642', phone_number, message)
  .then((response) => {
    console.log('Message send..');
    // do something with response
  })
  .catch((error) => {
    console.log(error);
    // handle error
  })
}
