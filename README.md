# Serverless URL Shortener

This is an exploration of using the various AWS services to build a URL shortening services.
It is based on DynamoDB, Lambda, API Gateway, S3, and the Serverless framework.

## To Deploy

First, you'll need to setup your DynamoDB database:

```bash
$ aws dynamodb create-table \
      --table-name <<YOUR_TABLE_NAME>>
      --attribute-definitions AttributeName=shortCode,AttributeType=S \
      --key-schema AttributeName=shortCode,KeyType=HASH \
      --provisioned-throughput ReadCapacityUnits=<<RCU>>,WriteCapacityUnits=<<WCU>>
```

You'll need to change your table name in the following location:
* `serverless.yml` in the IAM permissions
* `config/awsConfig.js` in the `SHORT_CODE_TABLE_NAME`

Then install `serverless`:

```bash
$ npm install -g serverless
```

Then build the source (this project is written in ES2017, but Lambda only supports ES2016)
and follow up with deployment.

```bash
$ npm run build
$ serverless deploy
```
