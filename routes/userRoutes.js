const express = require('express');
const router = express.Router();
const { processData, getBFHL } = require('../controllers/userController');


router.post('/bfhl', processData);
router.get('/bfhl',getBFHL)

module.exports = router;
