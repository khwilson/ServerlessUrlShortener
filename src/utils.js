const validator = require('validator');

const config = require('../config/base');

/**
 * Deterime if a shortCode is valid. To be valid, it must be:
 *   * an alphanumeric string
 *   * of positive length at most `config.MAX_SHORT_CODE_LENGTH`
 *
 * @param {string} shortCode - The short code to validate
 * @return {boolean} - Whether the short code is valid
 */
let validateShortCode = (shortCode) => {
  return (typeof(shortCode) == 'string') &&
         validator.isAlphanumeric(shortCode) &&
         (shortCode.length <= config.MAX_SHORT_CODE_LENGTH) &&
         (shortCode.length > 0);
};

/**
 * Deterime if a URL is valid. Note that a URL is *not* valid if it is
 * more than `config.MAX_URL_LENGTH` characters long.
 *
 * @param {string} theUrl - The url to validate
 * @return {boolean} - Whether the URL is valid
 */
let validateUrl = (theUrl) => {
  return (typeof(theUrl) == 'string') &&
         validator.isURL(theUrl) &&
         (theUrl.length <= config.MAX_URL_LENGTH);
};

module.exports = {
  validateShortCode: validateShortCode,
  validateUrl: validateUrl,
};
