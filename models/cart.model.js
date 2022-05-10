class Cart {
  constructor(items = [], totalQuantity = 0, totalPrice = 0) {
    this.items = items;
    this.totalQuantity = totalQuantity;
    this.totalPrice = totalPrice;
  }

  addItem(product) {
    const cartItem = {
      product: product,
      totalQuantity: 1,
      totalPrice: product.price,
    };
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].product.id === product.id) {
        this.items[i].totalQuantity++;
        this.items[i].totalPrice += product.price;

        this.totalQuantity++;
        this.totalPrice += product.price;
        return;
      }
    }

    this.items.push(cartItem);
    this.totalQuantity++;
    this.totalPrice += product.price;
  }

  async updateItem(productId, newQuantity) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].product.id === productId && newQuantity > 0) {
        const cartItem = { ...this.items[i] };
        const quantityChange = newQuantity - this.items[i].totalQuantity;
        cartItem.totalQuantity = newQuantity;
        cartItem.totalPrice += quantityChange * this.items[i].product.price;
        this.items[i] = cartItem;

        this.totalQuantity += quantityChange;
        this.totalPrice += quantityChange * this.items[i].product.price;
        return { updatedItemPrice: cartItem.totalPrice };
      } else if (this.items[i].product.id === productId && newQuantity <= 0) {
        console.log(
          `${this.totalQuantity} -= ${this.items[i].totalQuantity} = ${
            this.totalQuantity - this.items[i].totalQuantity
          } `
        );
        this.totalQuantity -= this.items[i].totalQuantity;
        this.totalPrice -= this.items[i].totalPrice;
        console.log(this.totalQuantity);
        this.items.splice(i, 1);
        return { updatedItemPrice: 0 };
      }
    }
    console.log("item not found!");
  }
}

module.exports = Cart;
