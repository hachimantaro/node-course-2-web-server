const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view_engine', 'hbs');

app.use((req, res, next) => {
    var currentTime = new Date().toString();
    var currentCall = `${currentTime}: ${req.method} @ ${req.url}`;
    console.log(currentCall);
    fs.appendFile('server.log', currentCall + `\n`, (err) => {
       if (err) {
           console.log(`Unable to append to server.log with error:\n\t${err.message}`);
       }
    });
    next();
});
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return (new Date().getFullYear());
});

hbs.registerHelper('screamIt', (string) => {
    return string.toUpperCase();
});

var port = process.env.PORT || 3000;



app.get('/', (req, res) => {
    //res.send('Hello xpress!');
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome!!!'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    })
});


//fail -- errorMessage (json)

app.get('/fail', (req, res) => {
   res.send({
       errorMessage: 'Failed to process request.'
   });
});


app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
