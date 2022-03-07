const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

const scheme = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: {
		type: String,
		required: [true, 'Name field is required']
	},
	hashedPassword: {
		type: String,
		required: [true, 'Password field is required']
	},
	role: {
		type: String,
	}
});

const User = mongoose.model('users', scheme);

User.findOne({ role: 'admin' }, (err, docs) => {
	if (docs === null) {
		User.create({
			_id: mongoose.Types.ObjectId(),
			name: 'admin',
			hashedPassword: '$2b$10$LqXaKVaXYjGcfapb0/f3pegoQhjjv1cKcITtgykcyeukRkhl8eQnG',
			role: 'admin'
		})
	}
})

module.exports = User;