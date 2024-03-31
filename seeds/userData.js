const { User } = require('../models');

const userdata = [
    {
        name: 'messi',
        email: 'messi@gmail.com',
        password: 'password123',
    },
    {
        name: 'ronaldo',
        email: 'ronaldo@gmail.com',
        password: 'password123',
    },
    {
        name: 'maradona',
        email: 'maradona@gmail.com',
        password: 'password123',
    },
];

const seedUser = () => User.bulkCreate(userdata);

module.exports = seedUser;