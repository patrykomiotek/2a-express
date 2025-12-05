import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

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

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/hello", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.post("/hello", (req, res) => {
  const { name } = req.body;
  res.json({ message: `Hello ${name}!` });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
