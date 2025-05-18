const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

router.get('/', dashboardController.index);
router.get('/registrant', dashboardController.registratant);
router.get('/scholarship', dashboardController.scholarship);
router.get('/setting', dashboardController.setting);

module.exports = router;