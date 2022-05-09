const router = require('express').Router();
const homeRoutes = require('./homeRoute');
const apiRoutes = require('./api');
// router.use('/users', userRoutes);
// router.use('/create', userRoutes);
router.use('/api', apiRoutes)
router.use('/', homeRoutes)
module.exports = router;