const assert = require('assert');
const uuid = require('node-uuid');

const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1', endpoint: 'http://localhost:8000'});

const databaseMod = require('../src/aws/database');

const TABLE_NAMES = {
  SHORT_CODE_TABLE_NAME: 'short-codes',
};

const database = new databaseMod.Database(TABLE_NAMES);

describe('Database', () => {
  describe('#get', () => {
    it('should return what was posted after a #put', async () => {
      let shortCode = uuid.v4().slice(0, 10);
      let url = uuid.v4().slice(0, 20);

      await database.put(shortCode, url);
      let gotten = await database.get(shortCode);
      assert.equal(shortCode, gotten.shortCode);
      assert.equal(url, gotten.url);
    });

    it('should return undefined when not present', async () => {
      let shortCode = uuid.v4().slice(0, 10);
      let gotten = await database.get(shortCode);
      assert.equal(undefined, gotten);
    });
  });

  describe('#delete', () => {
    it('should cause #get to return undefined after being #put', async () => {
      let shortCode = uuid.v4().slice(0, 10);
      let url = uuid.v4().slice(0, 20);

      await database.put(shortCode, url);
      let gotten = await database.get(shortCode);
      assert.equal(shortCode, gotten.shortCode);
      assert.equal(url, gotten.url);

      await database.delete(shortCode);
      gotten = await database.get(shortCode);
      assert.equal(undefined, gotten);
    });
  });
});
