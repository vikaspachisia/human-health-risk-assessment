const express = require('express');

const router = express.Router();

router.post('/', async (req, res) => {
    res.status(201).send('<h2>This is from service root. Try client root</h2>');
});

router.get('/', async (req, res) => {
    res.status(201).send('<h2>This is from service root. Try client root</h2>');
});

const routers = {
    rootRouter: router
};

module.exports = routers;