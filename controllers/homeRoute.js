const router = require('express').Router();
const { User } = require('../models');

router.get('/', async(req, res) => {
    try{
        console.log('hi')
        return {name: "koki"};
    }
    catch{
        console.log('yo')
    }
})

module.exports = router;
