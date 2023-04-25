let express = require('express');

let router = express.Router();

router.get('/', function (req, res, next) {
  res.redirect('/catalogue');
});

module.exports = router;
