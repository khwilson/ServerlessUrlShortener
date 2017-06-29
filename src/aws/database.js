const AWS = require('aws-sdk');

/** An interface to DynamoDB. */
class Database {

  /**
   * Setup the database, in particular constructs the DynamoDB
   * DocumentClient. Thus, make sure that you have run
   * AWS.config.update() somewhere else *before* calling this
   * function.
   *
   * @param {object} config - The specific config necesarry for the
   *   Database. Right now just needs the SHORT_CODE_TABLE_NAME key.
   */
  constructor(config) {
    this.config = config;
    this.dynamo = new AWS.DynamoDB.DocumentClient();
  }

  /**
   * Get the value associated with `shortCode` from the database.
   * Returns a Promise.
   *
   * @param {string} shortCode - The shortCode to look up
   * @return {object} - An object which has three keys:
   *  * shortCode: The passed shortCode
   *  * url: The url the shortCode points to (undefined if it's
   *         not in the database)
   *  * isPresent: A boolean of whether the url was in the database
   */
  get(shortCode) {
    const params = {
      TableName: this.config.SHORT_CODE_TABLE_NAME,
      Key: {
        shortCode: shortCode.toLowerCase(),
      },
    };
    return new Promise((resolve, reject) => {
      this.dynamo.get(params).promise()
        .then((result) => {
          if (result.Item) {
            result.Item['isPresent'] = true;
            resolve(result.Item);
          } else {
            resolve({
              shortCode: shortCode,
              isPresent: false,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }

  /**
   * Put the shortCode/url pair into the database.
   *
   * TODO (kevin) Reject Promise if item already exists
   *
   * @param {string} shortCode - The shortCode to store
   * @param {string} url - The url to store
   * @return {object} - The stored object, which has the shortCode, url,
   *   and the time it was created.
   */
  put(shortCode, url) {
    const params = {
      TableName: this.config.SHORT_CODE_TABLE_NAME,
      Item: {
        shortCode: shortCode.toLowerCase(),
        url: url,
        createdAt: Date.now(),
      },
    };

    return new Promise((resolve, reject) => {
      this.dynamo.put(params).promise()
        .then(() => resolve(params.Item))
        .catch((err) => reject(err));
    });
  }

  /**
   * Delete the shortCode from the table. Returns a void Promise.
   *
   * @param {string} shortCode - The key to delete
   * @return {void}
   */
  delete(shortCode) {
    const params = {
      TableName: this.config.SHORT_CODE_TABLE_NAME,
      Key: {
        shortCode: shortCode.toLowerCase(),
      },
    };

    return new Promise((resolve, reject) => {
      this.dynamo.delete(params).promise()
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }
}


module.exports = {
  Database: Database,
};
