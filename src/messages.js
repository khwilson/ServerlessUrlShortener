/** Messages to be returned in various situations */

/**
 * What to return if the short code already exists in the database.
 *
 * @param {object} url - An object with at least shortCode as a key
 * @return {object} - The JSON to return upon this request
 */
module.exports.getUrlConflictMessage = (url) => {
  return {
    shortCode: url.shortCode,
    message: `The short code ${url.shortCode} already exists`,
  };
};

/**
 * What to return if the short code is invalid.
 *
 * @return {object} - The JSON to return upon this request
 */
module.exports.getInvalidShortCodeMessage = () => {
  return {message: 'Invalid short code'};
};

/**
 * What to return if the URL is invalid.
 *
 * @return {object} - The JSON to return upon this request
 */
module.exports.getInvalidUrlMessage = () => {
  return {message: 'Invalid URL'};
};

/**
 * What to return when GETting a short code from the database
 *
 * @param {object} url - An object with at least `shortCode` and `url` as keys
 * @return {object} - The JSON to return upon this request
 */
module.exports.getUrlGetMessage = (url) => {
  return {url: url.url, shortCode: url.shortCode};
};

/**
 * What to return when GETting a short code from the database
 * that doesn't exist
 *
 * @param {object} url - An object with at least `shortCode` as a key
 * @return {object} - The JSON to return upon this request
 */
module.exports.getUrlDoesNotExistMessage = (url) => {
  return {
    shortCode: url.shortCode,
    message: `Short code ${url.shortCode} does not exist`,
  };
};

/**
 * What to return when POSTting a short code to the database
 *
 * @param {object} url - An object with at least `shortCode` and `url` as keys
 * @return {object} - The JSON to return upon this request
 */
module.exports.getUrlPostMessage = (url) => {
  return {
    shortCode: url.shortCode,
    message: 'Post succeeded',
    url: url.url,
  };
};

/**
 * What to return when DELETEing a short code to the database
 *
 * @param {object} url - An object with at least `shortCode` and `url` as keys
 * @return {object} - The JSON to return upon this request
 */
module.exports.getUrlDeleteMessage = (url) => {
  return {
    shortCode: url.shortCode,
    message: 'Delete succeeded',
    url: url.url,
  };
};
