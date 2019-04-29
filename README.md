# sls-examples

Example repo of Serverless Framework offering a variety of APIs via AWS, using the below tutorials:

- Node.js and Express REST API. Also offline development with DynamoDB local.
  - [Deploy a REST API using Serverless, Express and Node.js](https://serverless.com/blog/serverless-express-rest-api/)
- Custom domain setup via Route53 and API Gateway
  - [How to set up a custom domain name for Lambda & API Gateway with Serverless](https://serverless.com/blog/serverless-api-gateway-domain/)
- Cloudwatch Metrics & Alarms
  - [Serverless Ops 101 - Using CloudWatch Metrics & Alarms with Serverless Functions](https://serverless.com/blog/serverless-ops-metrics/)
  - [Serverless Ops 102 - CloudWatch Logs and Centralized Logging with AWS Lambda](https://serverless.com/blog/serverless-ops-logs/)
- Warm Lamdas to avoid cold starts
  - [Keeping Functions Warm - How To Fix AWS Lambda Cold Start Issues](https://serverless.com/blog/keep-your-lambdas-warm/)
  - Note that `webpack.config.js` has customisations to allow `serverless-webpack` and `serverless-plugin-warmup` to work side by side. See comments around `plugins` and `entries`.

Uses:

- Nodejs8.10 runtime
- ES6 support via Serverless
  - Webpack/Babel transpiling allowing exports to run in Lambda
- Jest for testing
- offline development supported (including DynamoDB locally)

## Usage

Deploy to AWS

```bash
# pushes a new stack
sls deploy

# pushes new zipped package for function
# (in case of an Express app with multiple routes set at the gateway, deploys the same app per function)
sls deploy -f <function-name>
```

Uses custom domain and certificate (from ACM). Base path is mapped during `sls deploy` process.

Run locally

```bash
# once only, install local DynamoDB service (setup for localhost:8000)
sls dynamodb install

# stand up services and functions on local server (setup for localhost:3000)
sls offline start
```

DB backed APIs

```bash
# create a user
curl -H "Content-Type: application/json" -X POST ${domain}/users -d '{"userId": "123", "name": "John Doe"}'
=> {"userId":"123","name":"John Doe"}

# get user by ID
curl -H "Content-Type: application/json" -X GET ${domain}/users/123
=> {"userId":"123","name":"John Doe"}
```

## License

MIT
