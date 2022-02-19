const knex = require('knex');

const knexfile = require('./knexfile');
const { Model } = require('objection');
const winston = require('winston');

module.exports = () => {
    const db = knex(knexfile.development);
    Model.knex(db);
    winston.info(`Database connected to ${knexfile.development.connection.database}...`);
};