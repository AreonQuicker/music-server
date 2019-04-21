'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var validator = require('email-validator');
var passwordValidator = require('password-validator');

var schema = new passwordValidator();

schema.is().min(3) // Minimum length 8
.is().max(100) // Maximum length 100
.has().uppercase() // Must have uppercase letters
.has().lowercase() // Must have lowercase letters
// .has()
// .digits() // Must have digits
.has().not().spaces() // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']);

var validateEmail = exports.validateEmail = function validateEmail(email) {
  return validator.validate(email);
};

var validatePassword = exports.validatePassword = function validatePassword(password) {
  return schema.validate(password);
};