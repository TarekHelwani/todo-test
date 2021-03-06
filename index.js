const winston = require("winston");
const express = require("express");
const app = express();

require("./startup/cors")(app);
require("./startup/routes")(app);
require("./startup/db")();

const port = process.env.PORT || 3900;
const server = app.listen(port, () =>
    winston.info(`Listening on port ${port}`)
);

module.exports = server;