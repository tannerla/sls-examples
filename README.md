# sls-examples

Example repo of Serverless Framework offering a variety of APIs via AWS, using the below tutorials:

- Node.js and Express REST API. Also offline development with DynamoDB local.
  - [Deploy a REST API using Serverless, Express and Node.js](https://serverless.com/blog/serverless-express-rest-api/)
- Custom domain setup via Route53 and API Gateway
  - [How to set up a custom domain name for Lambda & API Gateway with Serverless](https://serverless.com/blog/serverless-api-gateway-domain/)
- Cloudwatch Metrics & Alarms
  - [Serverless Ops 101 - Using CloudWatch Metrics & Alarms with Serverless Functions](https://serverless.com/blog/serverless-ops-metrics/)
  - [Serverless Ops 102 - CloudWatch Logs and Centralized Logging with AWS Lambda](https://serverless.com/blog/serverless-ops-logs/)

Uses:

- Nodejs8.10 runtime
- ES6 support
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

Uses custom domain and certificate (from ACM). Base path is mapped via `deploy`.

Run locally

```bash
# once only, install local DynamoDB service (setup for localhost:8000)
sls dynamodb install

# stand up services and functions on local server (setup for localhost:3000)
sls offline start
```

## License

MIT
