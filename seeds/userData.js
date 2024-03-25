const { User } = require('../models');

const userdata = [
    {
        username: 'messi',
        email: 'messi@gmail.com',
        password: 'password123',
    },
    {
        username: 'ronaldo',
        email: 'ronaldo@gmail.com',
        password: 'password123',
    },
    {
        username: 'maradona',
        email: 'maradona@gmail.com',
        password: 'password123',
    },
];

const seedUser = () => User.bulkCreate(userdata);

module.exports = seedUser;