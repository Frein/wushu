const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const mongoose = require('./mongooseInit')

const createMeridian = require('./Meridians/create')

const app = express();
app.use( bodyParser.json() );
app.use(express.static(path.join(__dirname, '../../build')));



app.use('/ping', function (req, res) {
    return res.send({point:123});
});

app.post('/meridian/create', createMeridian);

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../../build', 'index.html'));
});

app.listen(process.env.PORT || 8080);
