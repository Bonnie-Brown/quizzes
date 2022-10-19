// Require Express

const express = require('express')
const app = express();

// Require Method Override

const methodOverride = require("method-override")

// Use Parser

app.use(express.urlencoded({extended: true}))

// Use Method Override

app.use(methodOverride((req, res) => {
    if (req.body && req.body._method) {
        const method = req.body._method;
        return method
    }
}))

// Require Cookie Parser

const cookieParser = require('cookie-parser')
app.use(cookieParser())

app.use((req, res, next) => {

    const username = req.cookies.username
    const avatar = req.cookies.avatar

    res.locals.username = ''
    res.locals.avatar

    if(username){
        res.locals.username = username
        console.log(`Signed in as ${username}`)
    }

    if(avatar){
        res.locals.avatar = avatar
    }

    next();
})

// Static Assets

const path = require('path')
app.use(express.static(path.join(__dirname, 'public')))

// Logging

const logger = require('morgan')
app.use(logger('dev'))

// Routes


// Root Page

app.get('/', (req, res) => {

    if(req.cookies.username){
 
    res.redirect('/clucks')

    } else {
        res.render('sign_in')
    }
})

app.get('/sign_in', (req, res) => {
    res.render('sign_in')
})

// // Clucks Index Route

const clucksRouter = require('./routes/clucks')
app.use('/clucks', clucksRouter)



// // Sign In/Out POST Requests

// // Sign In 

app.post('/sign_in', (req,res) => {
    
    const cookie_max_age = 1000 * 60 * 60 * 24
    const username = req.body.username
    const avatar = req.body.avatar
    res.cookie('username', username, {maxAge: cookie_max_age })
    res.cookie('avatar', avatar, {maxAge: cookie_max_age })
    res.redirect('/')
})

// Sign Out

app.post('/sign_out', (req, res) => {
    res.clearCookie('username')
    res.clearCookie('avatar')
    res.redirect('/')
})

// Set View Engine

app.set('view engine', 'ejs')
app.set('views', 'views')

// Server

const PORT = 3000;
const DOMAIN = 'localhost'

app.listen(PORT, DOMAIN, () => {
    console.log(`Server is listening on http://${DOMAIN}:${PORT}`)
})