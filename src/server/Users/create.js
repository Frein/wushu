const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require("./UserModel");

module.exports = async (req, res) => {
	try {
		const data = req.body,
			user = {
				_id: mongoose.Types.ObjectId(),
				name: data.name,
				hashedPassword: await bcrypt.hash(data.password, 10),
				role: data.role
			},
			response = {
				msg: "User successfully created",
				data: user
			};

		if (await User.findOne({ name: data.name })) {
			res.send( {
				statusCode: 406,
				body: JSON.stringify({msg: 'This login is already taken'})
			});
			return
		}

		// Use Product.Model to create a new product
		await User.create(user);

		res.send( {
			statusCode: 201,
			body: JSON.stringify(response)
		});
	} catch (err) {
		console.log('user.create', err);
		res.send( {
			statusCode: 500,
			body: JSON.stringify({msg: err.message})
		});
	}
}
