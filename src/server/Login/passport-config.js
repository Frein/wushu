// const LocalStrategy = require('passport').Strategy;
const LocalStrategy = require('passport-local').Strategy;
// const LocalStrategy = require('passport-local');
// const Users = require('../Users/UserModel');
const bcrypt = require('bcrypt');
const Users = require('../Users/UserModel')

function initialize(passport, getUserByName, getUserById) {
	const authenticateUser = (name, password, done) => {
		// const user = Users.find({ name: /^name/ })
		// const user = Users.find({ name: new RegExp(`^${name}`) })
		// const user = await getUserByName(name)
		console.log('name', name)
		console.log('password', password)
		// await Users.findOne({ name }).exec().then(res => { console.log('Users find test', res) })
		// Users.findOne({ name }).exec().then(res => { console.log('Users find test', res) })
		Users.findOne({ name }, (err, user) => {
			console.log('Users find test', user)
			if (err) { console.error(err) }
		})

		// try {
		// 	const user = await getUserByName(name)
		//
		// 	if (user === null) {
		// 		console.log('No user with that Login')
		// 		return done(null, false, { message: 'No user with that Login' })
		// 	}
		//
		// 	// console.log('user', user)
		//
		// 	const isEqual = await bcrypt.compare(password, user.hashedPassword)
		// 	if (isEqual) {
		// 		console.log('passport success')
		// 		return done(null, user);
		// 	} else {
		// 		console.log('Password incorrect')
		// 		return done(null, false, { message: 'Password incorrect' });
		// 	}
		// } catch (err) {
		// 	return done(err)
		// }
		return getUserByName(name)
			.then(async user => {
				if (user === null) {
					console.log('No user with that Login')
					return done(null, false, { message: 'No user with that Login' })
				}

				console.log('user', user)

				return bcrypt.compare(password, user.hashedPassword)
					.then(isEqual => {
						if (isEqual) {
							console.log('passport success')
							return done(null, user);
						} else {
							console.log('Password incorrect')
							return done(null, false, { message: 'Password incorrect' });
						}
					})
					.catch(err => done(err))

				// try {
				// } catch (err) {
				// 	console.log('Password err', err)
				// 	return done(err);
				// }
			})
			.catch(err => done(err))
	};

	// passport.use('local', new LocalStrategy(
	passport.use(new LocalStrategy(
		{
			usernameField: 'name',
			// passwordField: ''
		},
		authenticateUser
	));

	// passport.serializeUser((user, done) => done(null, user.id));
	passport.serializeUser((user, done) => {
		// console.log('serializeUser ', JSON.stringify(user))
		return done(null, user.id)
	});
	passport.deserializeUser((id, done) => done(
		null,
		// await getUserById(id)
		getUserById(id)
			// .then(user => user)
			.then(user => {
				console.log('deserializeUser ', JSON.stringify(user))
				return user
			})
			.catch(err => console.error(err))
			// .catch(err => new Error(err))
	));
	// passport.deserializeUser(async (id, done) => done(null, await getUserById(id)));
}

module.exports = initialize;