import { signUp } from './controllers/authentication';

export default app => {
	app.post('/signup', signUp);
};
