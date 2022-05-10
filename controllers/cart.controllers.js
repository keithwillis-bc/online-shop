const Product = require("../models/product.model");

function getCart(req, res) {
  res.render("customer/cart/cart");
}

async function addCartItem(req, res, next) {
  let product;
  try {
    product = await Product.findById(req.body.productId);
  } catch (error) {
    next(error);
    return;
  }
  const cart = res.locals.cart;

  res.locals.cart.addItem(product);
  req.session.cart = cart;

  res.status(201).json({
    message: "Cart Updated",
    newTotalItems: cart.totalQuantity,
    newTotalPrice: cart.totalPrice,
  });
}

async function updateCartItem(req, res, next) {
  const cart = res.locals.cart;
  let updatedItemData;
  try {
    updatedItemData = await cart.updateItem(
      req.body.productId,
      req.body.quantity
    );
    console.log(updatedItemData);
  } catch (error) {
    next(error);
    return;
  }

  req.session.cart = cart;

  res.status(201).json({
    message: "Cart Updated!",
    updatedCartData: {
      newTotalQuantity: cart.totalQuantity,
      newTotalPrice: cart.totalPrice,
      updatedItemPrice: updatedItemData.updatedItemPrice,
    },
  });
}

module.exports = {
  addCartItem,
  getCart,
  updateCartItem,
};
