const passport = require('passport')

module.exports = (req, res, next) => {
	// console.log('inside /login')
	passport.authenticate(
		'local',
		{
			successRedirect: '/',
			failureRedirect: '/'
		},
		(err, user, info) => {
			// console.log('inside auth')

			if (err) { console.error(err)}


			// req.login(user, (err) => {
			req.logIn(user, (err) => {
				// console.log('inside login')
				// console.log(JSON.stringify(user))
				if (err) {
					console.log(err)
				}

				req.session.user = {
					name: user.name,
					role: user.role
				}

				// console.log('login', req.session)

				// res.redirect('/')
				// res.status(200)
				// res.send({ success: true })
				res.end()
			})
		}
	)(req, res, next);
}

// module.exports = async (req, res) => {
// 	try {
// 		passport.authenticate('local', {
// 			successRedirect: '/',
// 			failureRedirect: '/Login',
// 			failureFlash: true
// 		})
// 	} catch (err) {
// 		console.log(err) // output to netlify function log
// 		res.send( {
// 			statusCode: 500,
// 			body: {msg: err.message}
// 		});
// 	}
// }
