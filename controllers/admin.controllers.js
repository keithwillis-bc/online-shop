const Product = require("../models/product.model");

async function getProducts(req, res, next) {
  let products;
  try {
    products = await Product.findAll();
  } catch (error) {
    next(error);
    return;
  }
  res.render("admin/products/all-products", { products: products });
}

function getNewProduct(req, res) {
  res.render("admin/products/new-product");
}

async function getProduct(req, res, next) {
  try {
    const product = await Product.findById(req.params.id);
    res.render("admin/products/update-product", { product });
  } catch (error) {
    next(error);
    return;
  }
}

async function createNewProduct(req, res, next) {
  const product = new Product({
    ...req.body,
    image: req.file.filename,
  });

  try {
    await product.save();
  } catch (error) {
    next(error);
    return;
  }

  res.redirect("/admin/products");
}

async function updateProduct(req, res, next) {
  const product = new Product({
    ...req.body,
    _id: req.params.id,
  });
  if (req.file) {
    product.replaceImage(req.file.filename);
  }

  console.log(product);

  try {
    product.save();
  } catch (error) {
    next(error);
    return;
  }

  res.redirect("/admin/products");
}

async function removeProduct(req, res, next) {
  try {
    const product = await Product.findById(req.params.id);
    await product.remove();
  } catch (error) {
    return next(error);
  }

  res.json({message: 'Deleted product!'})
}

module.exports = {
  getProducts,
  getNewProduct,
  createNewProduct,
  getProduct,
  updateProduct,
  removeProduct,
};
