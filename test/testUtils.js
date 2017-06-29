const assert = require('assert');

const config = require('../config/base');
const utils = require('../src/utils');

describe('utils', () => {
  describe('#validateShortCode', () => {
    it('should return false if non-strings are passed', () => {
      assert.ok(!utils.validateShortCode([]));
      assert.ok(!utils.validateShortCode({}));
      assert.ok(!utils.validateShortCode(10));
    });

    it('should return false for empty strings', () => {
      assert.ok(!utils.validateShortCode(''));
    });

    it('should return true for alphanumeric short codes', () => {
      assert.ok(utils.validateShortCode('asdf8a982q3wJA8s'));
    });

    it('should return false for sufficiently long short codes', () => {
      let tooLongName = '';
      while (tooLongName.length <= config.MAX_SHORT_CODE_LENGTH) {
        tooLongName += 'a';
      }
      assert.ok(!utils.validateShortCode(tooLongName));
    });
  });
});
