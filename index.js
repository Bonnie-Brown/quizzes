// Require Express

const express = require('express')
const app = express();

// Require Parser

app.use(express.urlencoded({extended: true}))

// Require Cookie Parser

const cookieParser = require('cookie-parser')
app.use(cookieParser())

app.use((req, res, next) => {

    const username = req.cookies.username
    res.locals.username = ''

    if(username){
        res.locals.username = username
        console.log(`Signed in as ${username}`)
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
 
    res.render('home')
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
    res.cookie('username', username, {maxAge: cookie_max_age })
    res.redirect('/')
})

// Sign Out

app.post('/sign_out', (req, res) => {
    res.clearCookie('username')
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