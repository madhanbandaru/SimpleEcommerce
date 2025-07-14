const express = require('express');
const router = express.Router();
const { getAllOrders } = require('../controllers/order.controller');
const auth = require('../middleware/auth.middleware');
const isAdmin = require('../middleware/role.middleware');

router.get('/orders', auth, isAdmin, getAllOrders);

module.exports = router;
