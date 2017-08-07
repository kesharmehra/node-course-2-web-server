const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


var app = express();
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine','hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log(err);
        }

    });

app.use(express.static(__dirname + '/public'));


    res.render('maint.hbs', {
       pageTitle:'The site is under maintenance!!!',
       maintMessage: 'We are working on it. Will be back soon.' 
    })
})


hbs.registerHelper('getCurrentYear',() => {
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt',(text) => {
return text.toUpperCase() });

app.get('/', (req,res) => {
 //   res.send('<h1>Hello Express!!!</h1>');
 res.render('home.hbs', {
     welcomeMessage:'We welcome you to our website.',
     pageTitle: 'Our Home Page',

 })
})

app.get('/about',(req,res) => {
    res.render('about.hbs',{
        pageTitle: 'About Page',

    });
})

app.get('/bad',(req,res) => {
    res.send({
    errorMessage:'There was some error.'
    })
})

app.listen(3000, () => {
    console.log('server is up on port 3000');
});
