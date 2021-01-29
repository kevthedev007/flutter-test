const express = require('express');
const valController = require('../controller/valController.js')
let router = express.Router()

router.get('/', valController.home);
router.post('/validate-rule', (req, res, next) => {
    if(req.headers['content-type'] !== 'application/json' && req.body !== "object") {
        return res.json({
            "message": "Invalid JSON payload passed.",
            "status": "error",
            "data": null
        })
    };
    next()
}, valController.post)

module.exports = router;