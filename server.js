// const config = require("config");
require("express-async-errors");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var expressValidator = require('express-validator');
const winston = require("winston");

const app = express();

winston.add(winston.transports.File, { filename: 'logfile.log' });

// if (!config.get('jwtPrivateKey')) {
//     console.error("FATAL ERROR: TOEKN NOT DEFINED");
//     process.exit(1);
// }

var corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));



// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(expressValidator());

const db = require("./app/models");

db.sequelize.sync();
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
});
require("./app/routes/user.routes")(app);
require('./prod')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});