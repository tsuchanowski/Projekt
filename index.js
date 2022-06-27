const express = require('express');
const app = express();
const hbs = require('express-handlebars');
hbs.registerHelper("inc", function(value, options)
{
    return parseInt(value) + 1;
});
app.use(express.static('public'));
app.engine('hbs', hbs.engine({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: true }));
const post = require('./app/controllers/events.controller');

app.get('/', function (req, res) {

    post.list(function (err, events) {
        if (err) {
            res.send(err)
        }

        res.render('tabela', { events });
    });
});

app.post('/', function (req, res, events) {
    if (events.name == null) {
        res.send('Uzupełnij pola formularza');
    }

    else {
        post.add(req.body, function (err) {
            if (err) {
                res.send(err)
            }
            res.redirect('/');
        })
    }
});

app.post('/:id', function (req, res) {

    post.delete(req.params.id, function (err, events) {
        if (err) res.send(err);

        res.redirect('/');
    })

});

app.listen(8080, function () {
    console.log('Serwer Node.js działa');
});