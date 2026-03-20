import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { pinoHttp } from "pino-http";
import pino from "pino";

dotenv.config();

const app = express();
const port = 3000;

const logger = pino({
  transport: {
    target: "pino-pretty",
  },
});

// setup pino for logging
// TODO: Uncomment this when we have a production environment
// app.use(pinoHttp());

// enable CORS for all routes
app.use(cors());

// parse application/json (standard JSON)
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded (HTML forms)
app.use(bodyParser.urlencoded({ extended: true }));

// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: "application/*+json" }));

// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: "application/vnd.custom-type" }));

// parse an HTML body into a string
app.use(bodyParser.text({ type: "text/html" }));

// http://localhost:3000
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// GET http://localhost:3000/hello
app.get("/hello", (req, res) => {
  logger.info("Hello World!");
  res.json({ message: "Hello World!" });
});

// App specific endpoints
app.get("/api/players", (req, res) => {
  logger.info("/api/players");
  // logic

  // Request -> API Fortnite
  // axios.get('https://') - pobieranie danych

  // return result
  res.json({ message: "Hello World!" });
});

// POST http://localhost:3000/hello
app.post("/hello", (req, res) => {
  const { name } = req.body;
  res.json({ message: `Hello ${name}!` });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
