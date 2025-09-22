const express = require('express');
const router = express.Router();
const listCtrl = require('../controllers/listcontrollers');

router.get('/', listCtrl.getAll);

// like a list: POST /lists/:id/like { "userId": 2 }
router.post('/:id/like', listCtrl.likeList);

module.exports = router;
