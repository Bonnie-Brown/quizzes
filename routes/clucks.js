const express = require('express')
const knexfile = require('../knexfile')
const knex = require('../db/client')

const moment = require('moment');

const router = express.Router()

// Routes

// Render New Cluck

router.get('/new', (req, res) => {
    res.render('clucks/new', {cluck: false})
})

// Create New Cluck

router.post('/', (req, res) => {

    knex('clucks')
    .insert({
        username: req.cookies.username,
        avatarUrl: req.cookies.avatar,
        content: req.body.content,
        imageUrl: req.body.imageUrl,
    })
    .returning ('*')
    .then(clucks => {
        
        res.redirect(`/clucks`)
    })
})

// Index of all Clucks

router.get('/', (req, res) => {

    knex('clucks')
    .orderBy('id', 'desc')
    .then(clucks => {
        res.render('clucks/index', {clucks: clucks, moment: moment})
    })

})

// Show a single Cluck

router.get('/:id', (req,res) => {
    knex('clucks')
    .where('id', req.params.id)
    .first()
    .then(cluck => {
        res.render('clucks/show', {cluck: cluck, moment: moment})
    })
})

// Delete (Destroy) a Single Post
router.delete("/:id", (req, res) => {
    knex('clucks')
        .where('id', req.params.id)
        .del()
        .then(() => {
            res.redirect("/clucks")
        })
})

// Edit a Cluck

router.get("/:id/edit", (req, res) => {
    knex("clucks")
        .where("id", req.params.id)
        .first()
        .then(cluck => {
            res.render("clucks/edit", {cluck: cluck });
        })
})

// Update a Cluck

router.patch("/:id", (req, res) => {
    const updatedCluck = {

        content: req.body.content,
        imageUrl: req.body.imageUrl,
        updatedAt: knex.fn.now()
    };
    knex("clucks")
        .where("id", req.params.id)
        .update(updatedCluck)
        .then(() => {
            res.redirect(`/clucks/${req.params.id}`);
        });
});




module.exports = router