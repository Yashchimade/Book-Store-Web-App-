const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

function validateEmail(email) {
  // Check if the input is a string
  if (typeof email !== 'string') {
    return 'Invalid input';
  }

  // Check if the input contains the @ symbol
  if (!email.includes('@')) {
    return 'Invalid email';
  }

  // Split the input into local part and domain
  const [local, domain] = email.split('@');

  // Validate the local part
  if (!local.match(/^[a-z0-9.]+$/i) || local.startsWith('.') || local.endsWith('.')) {
    return 'Sorry, only letters (a-z), numbers (0-9), and periods (.) are allowed.';
  }

  // Validate the domain
  if (!domain.match(/^[a-z0-9.]+$/i) || domain.startsWith('.') || domain.endsWith('.')) {
    return 'Invalid domain. Only letters, numbers, and periods are allowed.';
  }

  return 'Valid email';
}

const userSchema = new Schema({
  fname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phonenumber: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.statics.signup = async function(fname, email, phonenumber, password) {
  if (!email || !password || !phonenumber) {
    throw Error('All fields must be filled');
  }

  const emailValidationResult = validateEmail(email);
  if (emailValidationResult !== 'Valid email') {
    throw Error(emailValidationResult);
  }

  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough');
  }

  // Phone number validation
  if (!validator.isMobilePhone(phonenumber, 'en-IN')) {
    throw Error('Invalid phone number');
  }

  if (phonenumber.length !== 10) {
    throw Error('Phone number must be 10 digits');
  }

  if (phonenumber.startsWith('0')) {
    throw Error('Phone number should not start with 0');
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error('Email already in use');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ fname, email, phonenumber, password: hash });

  return user;
};

userSchema.statics.login = async function(email, password) {
  if (!email || !password) {
    throw Error('All fields must be filled');
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error('Incorrect email');
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error('Incorrect password');
  }

  return user;
};

module.exports = mongoose.model('User', userSchema);