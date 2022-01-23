const bcrypt = require("bcryptjs");
const db = require("../data/database");

class Account {
  constructor(email, password, fullName, street, city, postalCode, isAdmin, id) {
    this.email = email;
    this.password = password;
    this.fullName = fullName;
    this.address = {
      street: street,
      city: city,
      postalCode: postalCode,
    };
    this.isAdmin = isAdmin,
    this.id = id;

  }

  async signup() {
    const hashedPassword = await bcrypt.hash(this.password, 12);
    await db.getDb().collection("accounts").insertOne({
      email: this.email,
      password: hashedPassword,
      name: this.fullName,
      address: this.address,
    });
  }

  static async getAccountByEmail(email) {
    const account = await db
      .getDb()
      .collection("accounts")
      .findOne({ email: email });
      console.log(account);
    if (!account) return;
    else {
      return new Account(
        account.email,
        account.password,
        account.fullName,
        account.address.street,
        account.address.city,
        account.address.postalCode,
        account.isAdmin,
        account._id
      );
    }
  }

  async hasMatchingPassword(password) {
    return bcrypt.compare(password, this.password);
  }
}

module.exports = Account;
