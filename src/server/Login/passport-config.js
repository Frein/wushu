// const LocalStrategy = require('passport').Strategy;
const LocalStrategy = require('passport-local').Strategy;
// const LocalStrategy = require('passport-local');
// const Users = require('../Users/UserModel');
const bcrypt = require('bcrypt');

function initialize(passport, getUserByName, getUserById) {
	const authenticateUser = (name, password, done) => {
		// const user = Users.find({ name: /^name/ })
		// const user = Users.find({ name: new RegExp(`^${name}`) })
		// const user = await getUserByName(name)
		// console.log('name', name)
		// console.log('password', password)

		return getUserByName(name)
			.then(async user => {
				if (user === null) {
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
		{ usernameField: 'name' },
		authenticateUser
	));

	passport.serializeUser((user, done) => done(null, user.id));
	passport.deserializeUser((id, done) => done(
		null,
		getUserById(id)
			.then(user => user)
			.catch(err => console.error(err))
			// .catch(err => new Error(err))
	));
	// passport.deserializeUser(async (id, done) => done(null, await getUserById(id)));
}

module.exports = initialize;