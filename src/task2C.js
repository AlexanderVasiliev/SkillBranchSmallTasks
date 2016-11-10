var express = require('express');
var app = express();


function getUserName(query) {
	var userName;
	var tmp = query.username.split(/https?:/);
	userName = tmp.pop().match(/(.+?\..+?\/)?@?([a-zA-Z0-9\._]+)/)[2];
	return '@' + userName;
}

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
	});

app.get('', function (req,res) {
	var userName = getUserName(req.query);
	console.log(userName);
	res.send(userName);
});

app.listen(8080);


/*TEST
https://vk.com/skillbranch
//vk.com/skillbranch
skillbranch
https://vk.com/skillbranch?w=wall-117903599_1076
*/