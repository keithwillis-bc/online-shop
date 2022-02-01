const express = require('express');
const productsController = require('../controllers/products.controllers');

const router = express.Router();

router.get('/products', productsController.getProducts);

router.get('/products/:id', productsController.getProduct);

module.exports = router;
