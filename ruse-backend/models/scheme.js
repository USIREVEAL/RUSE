const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Scheme = exports.Scheme = new Schema ({
	_id: { type: String },//with id
	name: {type: String, required: true, default: ""},
	dataCreated: {type: Date, required: true, default: new Date().getTime()}
});

//register the model
mongoose.model('Scheme', Scheme);