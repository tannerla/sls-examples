import express from "express";
import bodyParser from "body-parser";
import AWS from "aws-sdk";

const IS_OFFLINE = process.env.IS_OFFLINE;
const USERS_TABLE = process.env.USERS_TABLE;

// DB config
let dynamoDb;
if (IS_OFFLINE === "true") {
  dynamoDb = new AWS.DynamoDB.DocumentClient({
    region: "localhost",
    endpoint: "http://localhost:8000"
  });
} else {
  dynamoDb = new AWS.DynamoDB.DocumentClient();
}

// App init/config
const app = express();
app.use(bodyParser.json({ strict: false }));

// Routes
app.get("/", function(req, res) {
  res.send("Hi!");
});

app.get("/bye", function(req, res) {
  res.send("Bye!");
});

app.get("/users/:userId", function(req, res) {
  const params = {
    TableName: USERS_TABLE,
    Key: {
      userId: req.params.userId
    }
  };

  dynamoDb.get(params, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: "Could not get user" });
    }
    if (result.Item) {
      const { userId, name } = result.Item;
      res.json({ userId, name });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  });
});

// Create User endpoint
app.post("/users", function(req, res) {
  const { userId, name } = req.body;
  if (typeof userId !== "string") {
    res.status(400).json({ error: '"userId" must be a string' });
  } else if (typeof name !== "string") {
    res.status(400).json({ error: '"name" must be a string' });
  }

  const params = {
    TableName: USERS_TABLE,
    Item: {
      userId: userId,
      name: name
    }
  };

  dynamoDb.put(params, error => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: "Could not create user" });
    }
    res.json({ userId, name });
  });
});

// Export your express server so you can import it in the lambda function.
export default app
