const Product = require('../models/product.model');

async function getProducts(req, res, next) {
  let products;
  try {
    products = await Product.findAll();
    res.render('customer/products/all-products', { products: products });
  } catch (error) {
    next(error);
  }
}

async function getProduct(req, res, next) {
  try {
    const product = await Product.findById(req.params.id);
    res.render('customer/products/product-details', { product: product });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getProducts,
  getProduct,
};
