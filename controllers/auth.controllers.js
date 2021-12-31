const { nextTick } = require("process");
const Account = require("../models/account.models");
const authUtil = require("../util/authentication");

function getSignup(req, res) {
  res.render("customer/auth/signup");
}

function getLogin(req, res) {
  res.render("customer/auth/login");
}

async function processSignup(req, res, next) {
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
  let account = await Account.getAccountByEmail(req.email);
  if (account) {
    console.log("Account already exists");
    return;
  }

  account = new Account(email, password, fullName, street, city, postalCode);

  try{
    await account.signup();
  }
  catch(error){
    return next(error);
  }

  res.redirect("/login");
}

async function performLogin(req, res, next) {
  let user;
  try{
  user = await Account.getAccountByEmail(req.body.email);
  }
  catch{
    next(error);
  }

  if (!user) {
    res.redirect("/login");
    return;
  }

  const passwordIsCorrect = await user.hasMatchingPassword(req.body.password);

  if (!passwordIsCorrect) {
    res.redirect("/login");
    return;
  }

  authUtil.createUserSession(req, user, () => {
    res.redirect("/");
  });
}

function performLogout(req, res){
  authUtil.clearUserSession(req, res, () => {
    res.redirect("/login");
  });
}

module.exports = {
  getSignup,
  getLogin,
  processSignup,
  performLogin,
  performLogout,
};
