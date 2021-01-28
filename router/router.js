const express = require('express');
const valController = require('../controller/valController.js')
let router = express.Router()

router.get('/', valController.home);
router.post('/validate-rule', valController.post)

module.exports = router;