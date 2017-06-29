const AWS = require('aws-sdk');

const awsConfig = require('./config/awsConfig');
AWS.config.update(awsConfig.connectionConfig);

let handlers = require('./lib/handlers/aws');
module.exports = handlers;
