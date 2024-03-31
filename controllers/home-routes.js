const router = require('express').Router();
const {
    Users,
    Blog,
} = require('../models');

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

router.get('/', (req, res) => {
    res.render('homepage', {
        logged_in: req.session.logged_in,
    });
});

module.exports = router;