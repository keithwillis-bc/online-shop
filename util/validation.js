function accountIsValid(email, password, fullName, street, city, postalCode) {
  return (
    userCredentialsAreValid(email, password) &&
    !isEmpty(fullName) &&
    !isEmpty(street) &&
    !isEmpty(city) &&
    !isEmpty(postalCode)  
  );
}

function isEmpty(value) {
  return !value || value.trim() === "";
}

function userCredentialsAreValid(email, password) {
  return (
    !isEmpty(email) 
    && email.includes("@") 
    && !isEmpty(password) 
    && password.trim().length >= 6
  );
}

function emailIsConfirmed(email, confirmEmail) {
  return email === confirmEmail;
}

module.exports = {
  accountIsValid,
  emailIsConfirmed,
};
