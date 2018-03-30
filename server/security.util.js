const Promise = require('bluebird');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

const randomBytes = Promise.promisify(crypto.randomBytes, crypto);
const bcryptHash = Promise.promisify(bcrypt.hash, bcrypt);
const compare = Promise.promisify(bcrypt.compare, bcrypt);

module.exports.generateSecureToken = function generateSecureToken() {
  return randomBytes(48).then(buf => buf.toString('hex'));
};

module.exports.getHash = function getHash(text, salt = '') {
  return bcryptHash(`${text[0]}${salt}${text.slice(1)}`, 10);
};

module.exports.generateSalt = function generateSalt() {
  return randomBytes(16).then(buf => buf.toString('hex'));
};

module.exports.compareTextWithHash = function compareTextWithHash(text, hash, salt) {
  return compare(`${text[0]}${salt}${text.slice(1)}`, hash);
};

module.exports.generateShaHash = function generateShaHash(text, shaSecret) {
  return crypto.createHmac('sha256', shaSecret).update(text).digest('hex');
};
