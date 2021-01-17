var express = require('express');
var axios = require('axios');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

	const the_username = req.session.github_login || undefined;

	if (the_username == undefined) {
		res.redirect("/");
	}

	res.render('cveform', {
		title: 'Actual CVE Form',
		username: the_username
	});
});

router.post('/formsubmit', async function(req, res, next) {

	var redirect = "/";
	const the_username = req.session.github_login || undefined;

	if (the_username == undefined) {
		res.redirect("/");
	}

	//Create issue
	var body = {
		title: "Test title",
		body: `Test body\n/cc @${the_username}`,
		labels: ['new', 'check']
	};
        var opts = {
		headers: { accept: 'application/json' },
		auth: {
			username: 'dwfbot',
			password: process.env.GH_TOKEN,
		}
	};
        try {
                var resp = await axios.post(`https://api.github.com/repos/distributedweaknessfiling/test-bot-repo/issues`, body, opts); 
		redirect = resp['data']['html_url'];


	} catch(err) {
                console.log(err)
                res.status(500).json({ message: "A bad thing happened" });
        }  

	res.redirect(redirect);
});

module.exports = router;
