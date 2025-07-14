const express = require('express');
const router = express.Router();
const {
  placeOrder,
  getMyOrders,
  getOrderById
} = require('../controllers/order.controller');
const auth = require('../middleware/auth.middleware');

router.post('/', auth, placeOrder);
router.get('/', auth, getMyOrders);
router.get('/:id', auth, getOrderById);

module.exports = router;
