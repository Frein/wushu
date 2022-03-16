const passport = require('passport')

module.exports = (req, res, next) => {
	passport.authenticate(
		'local',
		{
			successRedirect: '/',
			failureRedirect: '/',
			// failureMessage: true
		},
		(err, user, info) => {
			if (err) {
				// console.error(err)
				res.status(500)
				res.send({
					statusCode: 500,
					body: { msg: err.message, info }
				})
				return
			}

			req.logIn(user, (err) => {
				if (err) {
					// console.log(err)
					res.status(403)
					res.send({
						statusCode: 201,
						body: { msg: err.message, info }
					})
					res.end()
					return
				}

				req.session.user = {
					name: user.name,
					role: user.role
				}

				// res.redirect('/')
				res.status(200)
				res.send({
					statusCode: 201,
					body: { msg: 'success', info }
				})
				res.end()
			})
		}
	)(req, res, next);
}
