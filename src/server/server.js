// if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').config()
// }

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const Users = require('./Users/UserModel');
const initializePassport = require('./Login/passport-config');
const cookieSession = require('cookie-session');
const session = require('express-session');
const cookieParser = require('cookie-parser');

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

// const createUser = require('./Users/create');
// const getLogin = require('./Login/get')

initializePassport(
  passport,
  name => Users.findOne({ name }),
  id => Users.findById(id)
);

const app = express();
app.use(cookieParser())
app.use( bodyParser.json() );
// app.use(session({
//   secret: 'OMGSecret42',
//   resave: false,
//   saveUninitialized: false,
//   cookie: { httpOnly: false }
// }))
app.use(cookieSession({
  name: 'session',
  secret: 'OMGSecret42',
  // secret: process.env.SESSION_SECRET,
  httpOnly: false,
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))
// app.use(session())
app.use(express.static(path.join(__dirname, '../../build')));

app.use(passport.initialize());
app.use(passport.session())


app.use('/ping', function (req, res) {
    return res.send({point:123});
});

// TODO перенести в отдельный файл
app.post('/login', (req, res, next) => {
  console.log('inside /login')
  passport.authenticate('local', (err, user, info) => {
    console.log('inside auth')

    if (err) { throw new Error(err)}

    // req.login(user, (err) => {
    req.logIn(user, (err) => {
      console.log('inside login')
      if (err) { console.error(err) }
      req.session.user = {
        name: user.name,
        role: user.role
      }

      // res.redirect('/')
      res.end()
    })
  })(req, res, next);
})
// app.post('/login', (req, res, next) => {
//   console.log('inside /login')
//   try {
//     passport.authenticate('local', {
//       failureRedirect: '/hue'
//     },(err, user, info) => {
//       console.log('inside auth')
//
//       // if (err) { throw new Error(err)}
//
//       req.login(user, (err) => {
//         console.log('inside login')
//         if (err) { console.error(err) }
//         req.session.user = {
//           name: user.name,
//           role: user.role
//         }
//
//         // res.redirect('/')
//         res.end()
//       })
//     });
//   } catch (err) {
//     console.error('auth err', err)
//   }
// })

// app.post(
//   '/login',
//   passport.authenticate('local', { failureRedirect: '/hue' }),
// )

app.post('/logout',(req,res)=>
{
  req.session = null;
  req.logout();
  // req.session.destroy(console.log);
  res.send('Thank you! Visit again');
})

app.post('/meridian/create', createMeridian);
app.post('/meridian/update', updateMeridian);
app.post('/meridian/delete', deleteMeridian);
app.post('/meridian/list', getListMeridian);
// app.post('/meridian/list', checkAuthenticated, getListMeridian);

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
app.post('/point/listByProblem', getListByProblem);
app.post('/point/delete', deletePoint);

app.post('/illness/list', getListIllnesses)

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../../build', 'index.html'));
});

app.listen(8080);

// TODO используй проверку
function checkAuthenticated(req, res, next) {
    // console.log('!', req.isAuthenticated)
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
