const router = require('express').Router();
const {
    Users,
    Blog,
} = require('../models');

const { Sequelize } = require('sequelize');

router.get('/', (req, res) => {
    res.render('homepage', {
        logged_in: req.session.logged_in,
    });
});

module.exports = router;