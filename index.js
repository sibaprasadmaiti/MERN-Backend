const express = require("express");
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const cors = require("cors");
const logger = require("morgan");
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
require("./configs/database.config");

const routes = require('./routes/v1');

const app = express();

const port = process.env.PORT || 3011;
const url = process.env.URL || "http://localhost:";

app.set("port", port);
app.locals.baseurl = url + port + "/";

app.use(cors({origin:"*"}));
app.use(logger("dev"));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());


// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true}));

app.use(express.static('public'));

// v1 api routes
app.use('/v1', routes);

app.listen(port, () => {
    console.log(`Server is running on ${app.locals.baseurl}`);
})