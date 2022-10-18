const express = require('express')
const knexfile = require('../knexfile')
const knex = require('../db/client')

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
        username: req.body.username,
        content: req.body.content,
        imageUrl: req.body.imageUrl,
    })
    .returning ('*')
    .then(clucks => {
        const cluck = clucks[0]
        res.redirect(`/clucks/${cluck.id}`)
    })
})

// Index of all Clucks

router.get('/', (req, res) => {

    knex('clucks')
    .orderBy('id', 'desc')
    .then(clucks => {
        res.render('clucks/index', {clucks: clucks})
    })

})

// Show a single Cluck

router.get('/:id', (req,res) => {
    knex('clucks')
    .where('id', req.params.id)
    .first()
    .then(cluck => {
        res.render('clucks/show', {cluck: cluck})
    })
})



module.exports = router