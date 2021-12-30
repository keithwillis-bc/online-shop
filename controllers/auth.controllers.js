function getSignup(req, res) {
  res.render("customer/auth/signup");
}

function getLogin(req, res) {}

function processSignup(req, res) {}

module.exports = {
  getSignup,
  getLogin,
  processSignup,
};
