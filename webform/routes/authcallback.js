var express = require('express');
var axios = require('axios');
var router = express.Router();

var clientId = 'f5b706a7714f8d48fef0';
var clientSecret = 'c81c37319d46151f917ab151ecb8df6ae80c9770';

/* GET home page. */
router.get('/', async function(req, res, next) {

	var body = {
		client_id: clientId,
		client_secret: clientSecret,
		code: req.query.code
	};
	var opts = { headers: { accept: 'application/json' } };
	try {
		var resp = await axios.post(`https://github.com/login/oauth/access_token`, body, opts);
		const token = resp.data['access_token'];

		body = { };
		opts = { headers:
				{
				accept: 'application/json',
				authorization: `token ${token}`
				}
		};

		resp = await axios.get(`https://api.github.com/user`, opts);

		const user_login = resp['data']['login'];
		req.session.github_login = user_login;
		res.redirect('/');
	} catch(err) {
		console.log(err)
		res.status(500).json({ message: "A bad thing happened" });
	}

});

module.exports = router;
