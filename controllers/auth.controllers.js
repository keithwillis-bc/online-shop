const Account = require('../models/account.models')
const authUtil = require('../util/authentication')
const accountValidation = require('../util/validation')
const sessionFlash = require('../util/sessionFlash')

function getSignup(req, res) {
  let sessionData = sessionFlash.getSessionData(req)
  if (!sessionData) {
    sessionData = {
      email: '',
      confirmEmail: '',
      password: '',
      fullName: '',
      street: '',
      city: '',
      postalCode: '',
    }
  }
  res.render('customer/auth/signup', { sessionData })
}

function getLogin(req, res) {
  let sessionData = sessionFlash.getSessionData(req)

  if (!sessionData) {
    sessionData = {
      email: '',
      password: '',
    }
  }
  res.render('customer/auth/login', { sessionData })
}

async function processSignup(req, res, next) {
  //do some validation
  console.log(req.body.email.toLowerCase())
  const dataEntered = {
    email: req.body.email.toLowerCase(),
    confirmEmail: req.body.confirmEmail.toLowerCase(),
    password: req.body.password,
    fullName: req.body.fullName,
    street: req.body.street,
    city: req.body.city,
    postalCode: req.body.postalCode,
  }
  if (
    !accountValidation.accountIsValid(
      dataEntered.email,
      dataEntered.password,
      dataEntered.fullName,
      dataEntered.street,
      dataEntered.city,
      dataEntered.postalCode
    ) ||
    !accountValidation.emailIsConfirmed(
      dataEntered.email,
      dataEntered.confirmEmail
    )
  ) {
    await sessionFlash.flashDataToSession(
      req,
      {
        message:
          'Please check your details. Password must be at least 6 characters long, Postal Code must be at least 5 characters long, and email must be in a valid email format.',
        ...dataEntered,
      },
      () => {
        res.redirect('/signup')
      }
    )
    return
  }

  let account = await Account.getAccountByEmail(dataEntered.email)
  if (account) {
    await sessionFlash.flashDataToSession(
      req,
      {
        message: 'Account already exists. Try logging in instead.',
        ...dataEntered,
      },
      () => {
        res.redirect('/signup')
      }
    )
    return
  }

  account = new Account(
    dataEntered.email,
    dataEntered.password,
    dataEntered.fullName,
    dataEntered.street,
    dataEntered.city,
    dataEntered.postalCode
  )

  try {
    await account.signup()
  } catch (error) {
    return next(error)
  }

  res.redirect('/login')
}

async function performLogin(req, res, next) {
  const dataEntered = { email: req.body.email, password: req.body.password }
  const sessionErrorData = {
    message: 'Invalid Credentials. Please check your email and password.',
    ...dataEntered,
  }
  let user
  try {
    user = await Account.getAccountByEmail(req.body.email)
  } catch {
    next(error)
  }

  if (!user) {
    sessionFlash.flashDataToSession(req, sessionErrorData, () => {
      res.redirect('/login')
    })
    return
  }

  const passwordIsCorrect = await user.hasMatchingPassword(req.body.password)

  if (!passwordIsCorrect) {
    sessionFlash.flashDataToSession(req, sessionErrorData, () => {
      res.redirect('/login')
    })
    return
  }

  authUtil.createUserSession(req, user, () => {
    res.redirect('/')
  })
}

function performLogout(req, res) {
  authUtil.clearUserSession(req, res, () => {
    res.redirect('/login')
  })
}

module.exports = {
  getSignup,
  getLogin,
  processSignup,
  performLogin,
  performLogout,
}
