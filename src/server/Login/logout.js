module.exports = (req, res)=>
{
	req.session.user = null;
	req.logOut();
	res.status(201)
	res.send({
		statusCode: 201,
		body: { msg: 'success' }
	})
	res.end()
}