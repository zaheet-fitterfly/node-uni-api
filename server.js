// const config = require("config");
require("express-async-errors");

const express = require("express");
// const Sentry = require('@sentry/node');
const bodyParser = require("body-parser");
const cors = require("cors");
var expressValidator = require('express-validator');
const winston = require("winston");

const session = require('express-session');

const app = express();
// Sentry.init({ dsn: "https://cd4527d2014a4544a63083443d09e4bc@o515592.ingest.sentry.io/5620675" });

winston.add(winston.transports.File, { filename: 'logfile.log' });

// if (!config.get('jwtPrivateKey')) {
//     console.error("FATAL ERROR: TOEKN NOT DEFINED");
//     process.exit(1);
// }

var corsOptions = {
    origin: "*"
};
// app.use(Sentry.Handlers.requestHandler());
app.use(cors(corsOptions));



// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false
}))

// app.use(expressValidator());

const db = require("./app/models");

db.sequelize.sync();
// db.sequelize.sync({ force: true });
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to zaheet node-api ." });
});
app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
});
require("./app/routes/user.routes")(app);
require('./prod')(app);
// app.use(Sentry.Handlers.errorHandler());
// app.use(
//     Sentry.Handlers.errorHandler({
//         shouldHandleError(error) {
//             // Capture all 404 and 500 errors
//             if (error.status === 404 || error.status === 500) {
//                 return true;
//             }
//             return false;
//         },
//     })
// );

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});