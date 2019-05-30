export default app => {
	app.get('/', (req, res, next) => {
		res.send(['Hello', 'world', '!']);
	});
};
