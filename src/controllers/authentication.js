import jwt from 'jwt-simple';
import User from '../models/user';
import { secret } from '../config';

const tokenForUser = user => {
    const iat = new Date().getTime();
    return jwt.encode({ sub: user.id, iat }, secret);
};

export const signUp = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res
            .status(422)
            .send({ error: 'You must provide an email and password.' });
    }

    User.findOne({ email }, (err, user) => {
        if (err) {
            return next(err);
        }

        if (user) {
            return res
                .status(422)
                .send({ error: `Email ${email} is already in use.` });
        }

        const newUser = new User({
            email,
            password
        });

        newUser.save(err => {
            if (err) {
                return next(err);
            }

            res.json({ token: tokenForUser(newUser) });
        });
    });
};

export const signIn = (req, res, next) => {
    res.send({ token: tokenForUser(req.user) });
};
