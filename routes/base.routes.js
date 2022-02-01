const express = require('express');
const authController = require('../controllers/auth.controllers');
const productsController = require('../controllers/products.controllers');
const router = express.Router();

router.get('/', productsController.getProducts);

router.get('/401', (req, res) => {
  res.status(401).render('shared/401');
});

router.get('/403', (req, res) => {
  res.status(403).render('shared/403');
});

module.exports = router;
