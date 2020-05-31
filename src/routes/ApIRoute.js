const express = require('express');
const router = express.Router();
const controller = require('../controllers/ApiController')
router.get('/meteomatics', controller.meteomatics);
router.get('/fireReports', controller.fireReports);
router.get('/fireReportsData', controller.fireReportsData);
router.get('/covidData', controller.covidData);
module.exports = router;