const express = require('express');
const app = express();
const hbs = require('express-handlebars');
app.use(express.static('public'));
app.engine('hbs', hbs.engine({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: true }));
const post = require('./app/controllers/user.controller');

app.get('/kandydat', function (req, res) {

    post.list(function (err, events) {
        if (err) {
            res.send(err)
        }

        res.render('tabela', { events });
    });
});

app.post('/kandydat', function (req, res) {
    post.add(req.body, function (err) {
        if (err) {
            res.send(err)
        }
        res.redirect('/kandydat');
    })
});

app.post('/kandydat', function(req, res){
     
    post.delete(req.params.id, function(err, events) {
        if(err) res.send(err);
        
        res.redirect('/kandydat');
    })
     
});

app.listen(8080, function () {
    console.log('Serwer Node.js działa');
});