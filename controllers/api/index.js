const router = require('express').Router();

const userRoutes = require('./user-routes');
const blogRoutes = require('./blogs-routes');

router.use('/users', userRoutes);
router.use('/dashboard', blogRoutes);

module.exports = router;