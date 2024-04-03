const router = require('express').Router();
const {
    User,
    Blog,
} = require('../models');

const withAuth = require('../utils/auth');
const { Sequelize } = require('sequelize');

//Renders Login page
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

//Renders Signup page
router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

//Renders My Dashboard page, if logged in
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

//Renders a single blog view when you click on a blog title
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

//Renders an 'Edit Blog' page when you click to edit the blog
router.get('/dashboard/edit/:id', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id);
        if (blogData) {
            const blog = blogData.get({ plain: true });
            res.render('editblog', {
                blog,
                logged_in: req.session.logged_in,
            });
        } else {
            res.status(404).send('Blog not found');
        }
    } catch (error) {
        console.log(error);
    }
});

//Renders all blogs for the home page view
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