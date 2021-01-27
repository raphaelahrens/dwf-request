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

router.post('/formsubmit', function(req, res, next) {

	var redirect = "/";
	const the_username = req.session.github_login || undefined;

	if (the_username == undefined) {
		res.redirect("/");
	}

	var refs = [];
	if (Array.isArray(req.body.references)) {
		refs = req.body.references;
	} else {
		refs = [req.body.references];
	}

	// We need to turn the form data into a structure, then into json
	cve_data = {
		vendor_name: req.body.vendorName,
		product_name: req.body.productName,
		product_version: req.body.productVersion,
		vulnerability_type: req.body.vulnType,
		affected_component: req.body.affectedComponent,
		attack_vector: req.body.attackVector,
		impact: req.body.impact,
		credit: req.body.credit,
		references: refs,
		reporter: the_username,
		notes: req.body.notes
	};

	cve_json = JSON.stringify(cve_data);

	//Create issue
	var body = {
		title: "Test title",
		body: `--- CVE JSON ---\n${cve_json}\n--- CVE JSON ---\n/cc @${the_username}`,
		labels: ['new', 'check']
	};
        var opts = {
		headers: { accept: 'application/json' },
		auth: {
			username: 'dwfbot',
			password: process.env.GH_TOKEN,
		}
	};
        axios.post(`https://api.github.com/repos/distributedweaknessfiling/test-bot-repo/issues`, body, opts)
	.then((resp) => {
		redirect = resp['data']['html_url'];
		res.redirect(redirect);
	})
	.catch((err) => {
                console.log(err)
                res.status(500).json({ message: "A bad thing happened" });
        })

});

module.exports = router;
