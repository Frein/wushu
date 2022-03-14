const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function initialize(passport, getUserByName, getUserById) {
	const authenticateUser = (name, password, done) => {
		return getUserByName(name)
			.then(async user => {
				if (user === null) {
					return done(null, false, 'No user with that Login')
				}

				return bcrypt.compare(password, user.hashedPassword)
					.then(isEqual => {
						if (isEqual) {
							return done(null, user);
						} else {
							return done(null, false, 'Password incorrect');
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
}

module.exports = initialize;