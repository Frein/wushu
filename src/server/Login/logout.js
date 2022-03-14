module.exports = (req, res)=>
{
	req.session.user = null;
	// console.log('logout', JSON.stringify(req.session))
	req.logOut();

	// console.log('logout', JSON.stringify(req.session))
	// res.send('Thank you! Visit again');
	res.end()
}