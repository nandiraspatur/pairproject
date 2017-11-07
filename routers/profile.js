const express = require('express')
const router = express.Router()

// define the profile page route
router.get('/', function(req, res) {
  res.render('profile/index')
})

module.exports = router
