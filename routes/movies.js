'use strict';

const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

router.get('/', async (req, res, next) => {
    try {
        const movies = await Movie.find();
        console.log(typeof movies);
        res.render('movies/index', { movies });
    } catch (err) {
        next(err);
    }
});

router.get('/new', async (req, res, next) => {
    res.render('movies/new-edit');
});

router.post('/', async (req, res, next) => {
    const { id, title, genre, plot } = req.body;
    const movie = { title, genre, plot };
    try {
        if (id) {
            await Movie.findByIdAndUpdate(id, movie);
        } else {
            await Movie.create(movie);
        }
        res.redirect('/movies');
    } catch (err) {
        next(err);
    }
});

router.get('/:id/edit', async (req, res, next) => {
    const { id } = req.params;
    try {
        const movie = await Movie.findById(id);
        res.render('movies/new-edit', movie);
    } catch (err) {
        next(err);
    }
});

router.post('/:id/delete', async (req, res, next) => {
    const { id } = req.params;
    try {
        const movie = await Movie.findById(id);
        await Movie.remove(movie);
        res.redirect('/movies');
    } catch (err) {
        next(err);
    }
});

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const movie = await Movie.findById(id);
        res.render('movies/show', movie);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
