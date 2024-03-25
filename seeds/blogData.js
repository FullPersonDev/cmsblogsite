const { Blog } = require('../models');

const blogdata = [
    {
        title: 'I love data analysis',
        body: 'Even better when we analyze the number of world cups and other international tournaments won!',
        user_id: 1,
    },
    {
        title: 'VAR technology will help us',
        body: 'As a soccer player you always get foul and VAR technology will help all of us see that it was clearly a foul!',
        user_id: 2,
    },
    {
        title: 'I am just the greatest',
        body: 'Marado, Marado...',
        user_id: 3
    },
];

const seedBlogs = () => Blog.bulkCreate(blogdata);

module.exports = seedBlogs;