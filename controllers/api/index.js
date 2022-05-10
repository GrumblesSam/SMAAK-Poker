const router = require('express').Router();

const userRoutes = require('./userRoute.js');

router.use('/user', userRoutes);

module.exports = router;
