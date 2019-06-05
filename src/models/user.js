import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

//Define User Model
const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    password: String
});

// On save hook, encrypt password
userSchema.pre('save', async function(next) {
    const user = this;

    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }

        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) {
                return next(err);
            }

            user.password = hash;
            next();
        });
    });
});

//Create the model class
const ModelClass = model('user', userSchema);

export default ModelClass;
