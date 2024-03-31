const router = require('express').Router();
const {
    User,
    Blog,
} = require('../models');

const withAuth = require('../utils/auth');
const { Sequelize } = require('sequelize');

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});
router.get('/dashboard', withAuth, async (req, res) => {
    const blogData = await Blog.findAll({
        include: [
            {
                model: User,
            },
        ],
    });
    const blogs = blogData.map((poll) => poll.get());
    res.render('dashboard', {
        blogs: blogs,
        logged_in: req.session.logged_in,
    });
});

router.get('/', (req, res) => {
    res.render('homepage', {
        logged_in: req.session.logged_in,
    });
});

module.exports = router;