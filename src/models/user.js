import { Schema, model } from 'mongoose';

const userSchema = new Schema({
	email: {
		type: String,
		unique: true,
		lowercase: true
	},
	password: String
});

const ModelClass = model('user', userSchema);

export default ModelClass;
