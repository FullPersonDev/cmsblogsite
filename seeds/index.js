const sequelize = require('../config/connection');
const seedUsers = require('./userData');
const seedBlogs = require('./blogData');

const seedAll = async () => {
    await sequelize.sync({force: true});

    await seedUsers();

    await seedBlogs();

    process.exit(0);
};

seedAll();