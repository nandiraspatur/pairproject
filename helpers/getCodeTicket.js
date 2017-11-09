module.exports = function () {
  let randomAbj = 'ABCDEFGHIZKLMNOPQRSTUVWXYZ'
  let code = ''
  for (var i = 0; i < 5; i++) {
    let randomNumber = Math.floor(Math.random()*10)
    code += randomNumber
  }
  for (var i = 0; i < 5; i++) {
    let random = Math.floor(Math.random()*10)
    code += randomAbj[random]
  }
  
  return code
}
