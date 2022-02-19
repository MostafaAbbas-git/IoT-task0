const express = require('express');
const readings = require('../routes/readings');


module.exports = function (app) {
    app.use(express.json());
    app.use('/api/readings', readings);

}