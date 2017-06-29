const Database = require('../aws/database').Database;
const config = require('../../config/awsConfig');
const urldb = new Database(config.tableNames);

const codes = require('../codes');
const messages = require('../messages');
const utils = require('../utils');

let extractBody = (event) => {
  let body = JSON.parse(event.body);
  return body;
};

let returnWithStatus = (event, context, callback, statusCode, body) => {
  const response = {
    statusCode: statusCode,
    body: JSON.stringify(body),
  };

  callback(null, response);
};

let getUrlFromEvent = async (event, context, callback) => {
  let shortCode = extractBody(event).shortCode;
  if (!utils.validateShortCode(shortCode)) {
    returnWithStatus(event, context, callback, codes.UNSUPPORTED_MEDIA_TYPE,
                     messages.getInvalidShortCodeMessage());
    return undefined;
  }
  return await urldb.get(shortCode);
};

let getToUrlFromEvent = (event) => {
  let toUrl = extractBody(event).url;
  if (!utils.validateUrl(toUrl)) {
    returnWithStatus(event, context, callback, codes.UNSUPPORTED_MEDIA_TYPE,
                     messages.getInvalidUrlMessage());
    return undefined;
  }
  return toUrl;
};

module.exports.postUrl = async (event, context, callback) => {
  let url = await getUrlFromEvent(event, context, callback);
  if (!url) return;

  let toUrl = getToUrlFromEvent(event, context, callback);
  if (!toUrl) return;

  if (url.isPresent) {
    returnWithStatus(event, context, callback, codes.CONFLICT,
                     messages.getUrlConflictMessage(url));
  } else {
    let newUrl = await urldb.put(url.shortCode, toUrl);
    returnWithStatus(event, context, callback, codes.OK,
                     messages.getUrlPostMessage(newUrl));
  }
};

module.exports.deleteUrl = async (event, context, callback) => {
  let url = await getUrlFromEvent(event, context, callback);
  if (!url) return;

  if (!url.isPresent) {
    returnWithStatus(event, context, callback, codes.DOES_NOT_EXIST,
                     messages.getUrlDoesNotExistMessage(url));
  } else {
    await urldb.delete(url.shortCode);
    returnWithStatus(event, context, callback, codes.OK,
                     messages.getUrlDeleteMessage(url));
  }
};

module.exports.redirectUrl = async (event, context, callback) => {
  let shortCode = event.pathParameters.shortCode;
  if (!utils.validateShortCode(shortCode)) {
    returnWithStatus(event, context, callback, codes.UNSUPPORTED_MEDIA_TYPE,
      messages.getInvalidShortCodeMessage());
    return;
  }

  let url = await urldb.get(shortCode);
  if (!url.isPresent) {
    returnWithStatus(event, context, callback, codes.DOES_NOT_EXIST,
      messages.getUrlDoesNotExistMessage(url));
    return;
  }

  callback(null, {
    statusCode: 301,
    headers: {
      'Location': url.url,
    },
  });
};
