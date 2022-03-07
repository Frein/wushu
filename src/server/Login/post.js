const passport = require('passport')

module.exports = async (req, res) => {
	try {
		passport.authenticate('local', {
			successRedirect: '/',
			failureRedirect: '/Login',
			failureFlash: true
		})
	} catch (err) {
		console.log(err) // output to netlify function log
		res.send( {
			statusCode: 500,
			body: {msg: err.message}
		});
	}
}