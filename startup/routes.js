const express = require('express');
const readings = require('../routes/readings');
const interface = require('../routes/interface');


module.exports = function (app) {
    app.use(express.json());
    app.use('/api/readings', readings);
    app.use('/api/interface', interface);

}