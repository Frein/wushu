// if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').config()
// }

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const Users = require('./Users/UserModel');

const mongooseInit = require('./mongooseInit');
mongooseInit();

const initializePassport = require('./Login/passport-config');
const cookieSession = require('cookie-session');

const login = require('./Login/login');
const logout = require('./Login/logout');

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
const getListByProblem = require('./Points/getListByProblem');
const deletePoint = require('./Points/delete');

const getListIllnesses = require('./Illness/getList');


initializePassport(
  passport,
  name => Users.findOne({ name }).exec(),
  id => Users.findById(id).exec()
);

const app = express();
app.use( bodyParser.json() );
app.use(cookieSession({
  name: 'session',
  secret: 'OMGSecret42',
  // secret: process.env.SESSION_SECRET,
  httpOnly: false,
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
app.use(express.static(path.join(__dirname, '../../build')));

app.use(passport.initialize());
app.use(passport.session());

app.use('/ping', function (req, res) {
    return res.send({point:123});
});

app.post('/login', login);
app.post('/logout',logout);

app.post('/meridian/create', checkAuthenticated, createMeridian);
app.post('/meridian/update', updateMeridian);
app.post('/meridian/delete', checkAuthenticated, deleteMeridian);
app.post('/meridian/list', getListMeridian);

app.post('/meridianBranch/create', createMeridianBranch);
app.post('/meridianBranch/list', getListMeridianBranch);
app.post('/meridianBranch/get', getMeridianBranch);
app.post('/meridianBranch/delete', deleteMeridianBranch);
app.post('/meridianBranch/update', updateMeridianBranch);

app.post('/file/create', createFile);
app.get('/file/get', getFile);
app.post('/file/list', getListFile);

app.post('/point/create', checkAuthenticated, createPoint);
app.post('/point/list', getListPoint);
app.post('/point/listByProblem', getListByProblem);
app.post('/point/delete', checkAuthenticated, deletePoint);

app.post('/illness/list', getListIllnesses)

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../../build', 'index.html'));
});

app.listen(8080);

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect('/')
    }
    return next()
}
