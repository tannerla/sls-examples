import awsServerlessExpress from "aws-serverless-express";
import app from "./app";

const server = awsServerlessExpress.createServer(app);

export const api = (event, context) => {
  
  // Immediate response for WarmUp plugin, exit before further handling
  if (event.source === "serverless-plugin-warmup") {
    console.log("WarmUp - Lambda is warm!");
    return "Lambda is warm!";
  }

  awsServerlessExpress.proxy(server, event, context);
};
