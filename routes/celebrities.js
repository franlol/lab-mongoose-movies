'use strict';

const express = require('express');
const router = express.Router();
const Celebrity = require('../models/Celebrity');

router.get('/', async (req, res, next) => {
    try {
        const celebrities = await Celebrity.find();
        res.render('celebrities/index', { celebrities });
    } catch (err) {
        next(err);
    }
});

router.get('/new', (req, res, next) => {
    res.render('celebrities/new-edit');
});

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const celebrity = await Celebrity.findById(id);
        res.render('celebrities/show', celebrity);
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    const { id, name, occupation, catchPhrase } = req.body;
    const celebrity = { name, occupation, catchPhrase };
    try {
        if (req.body.id) {
            await Celebrity.findByIdAndUpdate(id, celebrity);
        } else {
            await Celebrity.create(celebrity);
        }
        res.redirect('/celebrities');
    } catch (err) {
        next(err);
    }
});

router.post('/:id/delete', async (req, res, next) => {
    const { id } = req.params;
    try {
        const celebrity = await Celebrity.findById(id);
        console.log(celebrity);
        await Celebrity.remove(Celebrity.findById(id));
        res.redirect('/celebrities');
    } catch (err) {
        next(err);
    }
});

router.get('/:id/edit', async (req, res, next) => {
    const { id } = req.params;
    try {
        const celebrity = await Celebrity.findById(id);
        res.render('celebrities/new-edit', celebrity);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
