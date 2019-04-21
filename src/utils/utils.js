const validator = require('email-validator');
const passwordValidator = require('password-validator');

const schema = new passwordValidator();

schema
  .is()
  .min(3) // Minimum length 8
  .is()
  .max(100) // Maximum length 100
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  // .has()
  // .digits() // Must have digits
  .has()
  .not()
  .spaces() // Should not have spaces
  .is()
  .not()
  .oneOf(['Passw0rd', 'Password123']);

export const validateEmail = email => validator.validate(email);

export const validatePassword = password => schema.validate(password);
