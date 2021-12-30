const bcrypt = require("bcryptjs");
const db = require("../data/database");

class Account {
  constructor(email, password, fullName, street, city, postalCode) {
    this.email = email;
    this.password = password;
    this.fullName = fullName;
    this.Address = {
      street: street,
      city: city,
      postalCode: postalCode,
    };
  }

  async signup() {
    const hashedPassword = await bcrypt.hash(this.password, 12);
    await db.getDb().collection("accounts").insertOne({
      email: this.email,
      password: hashedPassword,
      name: this.name,
      address: this.address,
    });
  }

  static async getAccountByEmail(email) {
    const account = await db
      .getDb()
      .collection("accounts")
      .findOne({ email: email });
    if (!account) return;
    else
      return new Account(
        accountDocument.email,
        accountDocument.password,
        accountDocument.fullName,
        accountDocument.Address.street,
        accountDocument.Address.city,
        accountDocument.Address.postalCode
      );
  }
}

module.exports = Account;
