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
                attributes: ['name'],
            },
        ],
    });
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    res.render('dashboard', {
        blogs,
        logged_in: req.session.logged_in,
    });
});

router.get('/dashboard/:id', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            include: [{ model: User, attributes: ['name'] }],
        });

        if(!blogData) {
            res.status(400).send('Blog not found');
            return;
        }

        const blog = blogData.get({ plain: true });

        res.render('blog', {
            blog,
            logged_in: req.session.logged_in,
        });
    } catch (error) {
        console.log(error);
    }
});

router.get('/', async (req, res) => {
    try {
        const blogsData = await Blog.findAll({
            include: [
                {
                model: User,
                attributes: ['name'],
                }],
        });
        const blogs = blogsData.map((blog) => blog.get({ plain: true }));
        res.render('homepage', {
            blogs,
            logged_in: req.session.logged_in,
        });
    } catch(error) {
        console.log(error);
    }
    });

module.exports = router;