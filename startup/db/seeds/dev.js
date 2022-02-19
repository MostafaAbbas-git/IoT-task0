
exports.seed = async function (knex) {

    // Insert all rows
    await knex('sensor1').insert([
        {
            "id": 1,
            "readings": 10

        },
        {
            "id": 2,
            "readings": 20

        },
        {
            "id": 3,
            "readings": 30

        }
    ]);

    return knex('sensor2').insert([
        {
            "id": 1,
            "readings": 100

        },
        {
            "id": 2,
            "readings": 200

        },
        {
            "id": 3,
            "readings": 300

        }
    ]);

};