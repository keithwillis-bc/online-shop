const Account = require("../models/account.models");

function getSignup(req, res) {
  res.render("customer/auth/signup");
}

function getLogin(req, res) {
  res.render("customer/auth/login");
}

async function processSignup(req, res) {
  //do some validation
  const email = req.body.email;
  const password = req.body.password;
  const fullName = req.body.fullName;
  const street = req.body.street;
  const city = req.body.city;
  const postalCode = req.body.postalCode;
  /*
  if (
    !accountValidation.isValidAccount(
      email,
      password,
      fullName,
      street,
      city,
      postalCode
    )
  ) {
    console.log("Please check your details");
    return;
  }
*/
  let account = Account.getAccountByEmail(req.email);
  if (account) {
    console.log("Account already exists");
    return;
  }

  account = new Account(
    email,
    password,
    fullName,
    street,
    city,
    postalCode
  );

  account.signup().then(() => {
    res.redirect("/login");
  });
}

module.exports = {
  getSignup,
  getLogin,
  processSignup,
};
