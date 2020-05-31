const express = require('express');
const router = express.Router();
const controller = require('../controllers/ConversationController')
router.post('/conversation', controller.post);
module.exports = router;