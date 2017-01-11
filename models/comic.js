var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    
	imagePath: { type: String, required: true },

	title: { type: String, required: true },
	
	alt: { type: String, required: true }, 

	description: {type: String, required: false},

	comicNumber: { type: Number, required: true },
	
	date: { type: String, required: true }

});

module.exports = mongoose.model('Comic', schema);