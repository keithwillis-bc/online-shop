const db = require("../data/database");
const mongodb = require("mongodb");

const ObjectId = mongodb.ObjectId;

class Product {
  constructor(productData) {
    this.title = productData.title;
    this.summary = productData.summary;
    this.price = +productData.price;
    this.description = productData.description;
    this.image = productData.image; //the name of the file
    this.updateImageData();
    if (productData._id) this.id = productData._id.toString();
  }

  static async findAll() {
    const productItems = await db
      .getDb()
      .collection("products")
      .find()
      .toArray();

    return productItems.map((productDocument) => {
      return new Product(productDocument);
    });
  }

  static async findById(id) {
    //convert to objectid
    let myId;
    try {
      myId = new ObjectId(id);
    } catch (error) {
      throw error;
    }
    const product = await db
      .getDb()
      .collection("products")
      .findOne({ _id: myId });
    if (!product) {
      const error = new Error("Could not find product with provided id.");
      error.code = 404;
      throw error;
    }
    return new Product(product);
  }

  async save() {
    const productData = {
      title: this.title,
      summary: this.summary,
      price: this.price,
      description: this.description,
      image: this.image,
    };

    if (this.id) {
      const myID = ObjectId(this.id);
      if(!this.image){
        delete productData.image;
      }
      await db
        .getDb()
        .collection("products")
        .updateOne({ _id: myID }, { $set: productData });
    } else {
      await db.getDb().collection("products").insertOne(productData);
    }
  }

  async replaceImage(newImage){
    this.image = newImage;
    this.updateImageData();
  }

  updateImageData(){
    this.imagePath = `product-Data/images/${this.image}`;
    this.imageUrl = `products/assets/images/${this.image}`;
  }
}

module.exports = Product;
