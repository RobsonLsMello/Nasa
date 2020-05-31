const express = require('express');
const router = express.Router();
const controller = require('../controllers/apiController')
router.get('/meteomatics', controller.meteomatics);
router.get('/fireReports', controller.fireReports);
router.get('/fireReportsData', controller.fireReportsData);
router.get('/covidData', controller.covidData);
module.exports = router;