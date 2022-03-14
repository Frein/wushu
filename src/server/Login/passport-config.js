const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function initialize(passport, getUserByName, getUserById) {
	const authenticateUser = (name, password, done) => {
		return getUserByName(name)
			.then(async user => {
				if (user === null) {
					// console.log('No user with that Login')
					return done(null, false, { message: 'No user with that Login' })
				}

				return bcrypt.compare(password, user.hashedPassword)
					.then(isEqual => {
						if (isEqual) {
							// console.log('passport success')
							return done(null, user);
						} else {
							// console.log('Password incorrect')
							return done(null, false, { message: 'Password incorrect' });
						}
					})
					.catch(err => {
						console.log(err)
						done(err)
					})
			})
			.catch(err => {
				console.log(err)
				done(err)
			})
	};

	passport.use(new LocalStrategy(
		{
			usernameField: 'name',
		},
		authenticateUser
	));

	passport.serializeUser((user, done) => done(null, user.id));
	passport.deserializeUser(async (id, done) => done(null, await getUserById(id)));

	// passport.serializeUser((user, done) => {
	// 	console.log('serializeUser ', JSON.stringify(user))
	// 	return done(null, user.id)
	// });
	// passport.deserializeUser((id, done) => done(
	// 	null,
	// 	// await getUserById(id)
	// 	getUserById(id)
	// 		// .then(user => user)
	// 		.then(user => {
	// 			console.log('deserializeUser ', JSON.stringify(user))
	// 			return user
	// 		})
	// 		.catch(err => console.error(err))
	// ));
}

module.exports = initialize;