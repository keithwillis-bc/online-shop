const express = require('express');
const cartController = require('../controllers/cart.controllers');

const router = express.Router();

router.post('/items', cartController.addCartItem);

router.get('/', cartController.getCart);

module.exports = router;
