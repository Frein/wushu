// const mongoose = require('mongoose');
const User = require('../Users/UserModel');

module.exports = async (req, res) => {
	try {
		const data = req.body
		const user = await User.findOne({ name: data.name })



		console.log('user', user)

		res.send({
			statusCode: 201,
			body: user
		})

	} catch (err) {
		console.log(err) // output to netlify function log
		res.send( {
			statusCode: 500,
			body: {msg: err.message}
		});
	}
}
