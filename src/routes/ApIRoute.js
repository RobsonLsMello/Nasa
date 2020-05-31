const express = require('express');
const router = express.Router();
const controller = require('../controllers/apiController')
router.get('/meteomatics', controller.meteomatics);
module.exports = router;