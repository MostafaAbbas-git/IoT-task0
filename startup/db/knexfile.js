// Update with your config settings.
const { knexSnakeCaseMappers } = require('objection');

module.exports = {

    development: {
        client: 'mysql2',
        connection: {
            host: '127.0.0.1',
            database: 'iot-task0',
            user: 'root',
            password: null
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        },
        seeds: {
            directory: './seeds',
        },
        ...knexSnakeCaseMappers,
    }
};
