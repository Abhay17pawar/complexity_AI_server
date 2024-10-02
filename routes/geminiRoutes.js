const express = require('express');
const { generateResponse } = require('../controllers/geminiController');

const router = express.Router();

router.post('/generate', generateResponse);

module.exports = router;
