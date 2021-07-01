const express = require('express');
const todo = require('../routes/todo');
const error = require('../middlewares/error');

module.exports = function(app) {
    app.use(express.json());
    app.use('/api/todo', todo);
    app.use(error);
}