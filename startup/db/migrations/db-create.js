
exports.up = async function (knex) {
    await knex.schema
        .createTable('sensor1', (table) => {
            table.increments(); // INT id column, autoincrement 
            table.integer('readings');

            table.timestamps(true, true);
        })

    return knex.schema
        .createTable('sensor2', (table) => {
            table.increments(); // INT id column, autoincrement 
            table.integer('readings');

            table.timestamps(true, true);
        })
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('sensor1')
        .dropTableIfExists('sensor2');
};