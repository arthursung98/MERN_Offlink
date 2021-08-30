const mongoose = require('mongoose');

const linkSchema = mongoose.Schema({
	linkname : {
		type: String
	},
	linkLeader : {
		type: String
	},
	maxMember : {
		type: Number
	}
})

const Link = mongoose.model('Link', linkSchema);
module.exports = { Link };