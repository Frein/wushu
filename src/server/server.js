const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const mongoose = require('./mongooseInit')

const createMeridian = require('./Meridians/create');
const updateMeridian = require('./Meridians/update');
const getListMeridian = require('./Meridians/getList');
const deleteMeridian = require('./Meridians/delete');

const createMeridianBranch = require('./MeridianBranches/create');
const getListMeridianBranch = require('./MeridianBranches/getList');
const getMeridianBranch = require('./MeridianBranches/get');
const deleteMeridianBranch = require('./MeridianBranches/delete');
const updateMeridianBranch = require('./MeridianBranches/update');

const createFile = require('./Files/create');
const getFile = require('./Files/get');
const getListFile = require('./Files/getList');

const createPoint = require('./Points/create');
const getListPoint = require('./Points/getList');
const deletePoint = require('./Points/delete');

const app = express();
app.use( bodyParser.json() );
app.use(express.static(path.join(__dirname, '../../build')));



app.use('/ping', function (req, res) {
    return res.send({point:123});
});

app.post('/meridian/create', createMeridian);
app.post('/meridian/update', updateMeridian);
app.post('/meridian/delete', deleteMeridian);
app.post('/meridian/list', getListMeridian);

app.post('/meridianBranch/create', createMeridianBranch);
app.post('/meridianBranch/list', getListMeridianBranch);
app.post('/meridianBranch/get', getMeridianBranch);
app.post('/meridianBranch/delete', deleteMeridianBranch);
app.post('/meridianBranch/update', updateMeridianBranch);

app.post('/file/create', createFile);
app.get('/file/get', getFile);
app.post('/file/list', getListFile);

app.post('/point/create', createPoint);
app.post('/point/list', getListPoint);
app.post('/point/delete', deletePoint);

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../../build', 'index.html'));
});

app.listen(process.env.PORT || 8080);
