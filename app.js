require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');
//const {flash} = require("express-flash-message");
const session = require('express-session');
const flash = require('connect-flash');
const connectDB = require('./server/config/db');


const app = express();
const port = 4000 || process.env.PORT;

// Connect to Database
connectDB();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'));

// Static files
app.use(express.static('public'));

// Express Session
app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        }
    })
);

// Flash Message
// app.use(
//     flash({ 
//         sessionKeyName: 'express-flash-message'
//     })
// );
app.use(flash());

// Templating Engine
app.use(expressLayout);
app.set('layout', './layouts/main'); 
app.set('view engine', 'ejs');

//Routes
app.use('/', require('./server/routes/employee'))

//Handle 404
app.get('*', (req, res) => {
    res.status(404).render('404');
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});