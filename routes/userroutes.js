const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/usercontrollers');

router.post('/', userCtrl.createUser);

module.exports = router;
