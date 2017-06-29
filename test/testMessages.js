const assert = require('assert');

const messages = require('../src/messages');

const MOCK_URL = {
  shortCode: 'someShortCode',
  url: 'http://www.google.com',
};

describe('messages', () => {
  describe('#getUrlConflictMessage', () => {
    it('should return a valid message', () => {
      let message = messages.getUrlConflictMessage(MOCK_URL).message;
      assert.ok(message.includes(MOCK_URL.shortCode));
    });
  });
  describe('#getInvalidShortCodeMessage', () => {
    it('should return a valid message', () => {
      assert.equal('Invalid short code',
                   messages.getInvalidShortCodeMessage(MOCK_URL).message);
    });
  });
  describe('#getInvalidUrlMessage', () => {
    it('should return a valid message', () => {
      assert.equal('Invalid URL',
                   messages.getInvalidUrlMessage(MOCK_URL).message);
    });
  });
  describe('#getUrlGetMessage', () => {
    it('should return a valid message', () => {
      let body = messages.getUrlGetMessage(MOCK_URL);
      assert.equal(MOCK_URL.shortCode, body.shortCode);
      assert.equal(MOCK_URL.url, body.url);
    });
  });
  describe('#getUrlPostMessage', () => {
    it('should return a valid message', () => {
      let body = messages.getUrlPostMessage(MOCK_URL);
      assert.equal(MOCK_URL.shortCode, body.shortCode);
      assert.equal(MOCK_URL.url, body.url);
    });
  });
  describe('#getUrlDoesNotExistMessage', () => {
    it('should return a valid message', () => {
      let body = messages.getUrlDoesNotExistMessage(MOCK_URL);
      assert.equal(MOCK_URL.shortCode, body.shortCode);
    });
  });
});
