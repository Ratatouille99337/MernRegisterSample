require("dotenv").config();
const port = process.env.PORT || 7777;
var cors = require("cors");

var express = require("express");
var app = express();
const bodyParser = require("body-parser");

const corsOption = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOption));
// Router
const Route = require("./routes/index");

// Database connect function
const connectdb = require("./config/db");

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect DB
connectdb();

// Use routes
app.use("/v1/api", Route);

// enable CORS without external module

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () =>
  console.log(`Testimonials API is now running on port ${port}`)
);
