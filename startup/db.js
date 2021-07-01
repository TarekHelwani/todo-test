const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

module.exports = async function () {
    const db = config.get('db');
    await mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }).
        then(() => winston.info(`Connected to ${db}...`));
}