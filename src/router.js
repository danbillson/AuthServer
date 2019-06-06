import passport from 'passport';
import { signUp, signIn } from './controllers/authentication';
import passportService from './services/passport';

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignIn = passport.authenticate('local', { session: false });

export default app => {
    app.get('/', requireAuth, (req, res) => {
        res.send({ hi: 'there' });
    });

    app.post('/signup', signUp);
    app.post('/signin', requireSignIn, signIn);
};
