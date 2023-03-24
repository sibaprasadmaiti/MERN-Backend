const express = require("express");
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const cors = require("cors");
const logger = require("morgan");
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
require("./configs/database.config");

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const basicAuth = require('express-basic-auth')


const routes = require('./routes/v1');

const app = express();

const port = process.env.PORT || 3011;
const url = process.env.URL || "http://localhost:";

app.set("port", port);
app.locals.baseurl = url + port + "/";

/**************** Swagger Definition ***************/
const swaggerOptions = {
    definition: {
        openapi: '3.0.3',
        info: {
            title: 'MERN-Project-API',
            version: '1.0.0',
            description: 'Charge KW API Documentation.',
            contact: {
                email: 'sibumaiti32@gmail.com'
            },
            license: {
                name: 'Apache 2.0',
                url: 'http://www.apache.org/licenses/LICENSE-2.0.html'
            }
        },
        components: {
            securitySchemes: {
                "Bearer": {
                    "type": "apiKey",
                    "name": "Authorization",
                    "in": "header"
                }
            }
        },
        security: [
            {
                Bearer: []
            }
        ],
        servers: [
            {
                url: 'http://localhost:3011/v1',
                description: 'This url is for local server'
            }
        ],
    },
    apis: ['routes/v1/*.js', 'routes/v1/user/*.js']
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
// Swagger Api.
app.use("/api-docs",basicAuth({users: { [process.env.SWAGGERUIUSERNAME]:process.env.SWAGGERUIPASSWORD }, challenge: true }), swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(cors({ origin: "*" }));
app.use(logger("dev"));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());


// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// v1 api routes
app.use('/v1', routes);

app.listen(port, () => {
    console.log(`Server is running on ${app.locals.baseurl}`);
})