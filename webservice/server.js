(function(){

'use strict';

const restify = require('restify');
const config = require('../package.json');
const Response = require('./response');

class Server {
	
	constructor(logger, getUser, updateIssue) {
		let api = restify.createServer({
			name: config.name,
			version: config.version
		});
		api.use(restify.acceptParser(api.acceptable));
		api.use(restify.queryParser());
		api.use(restify.bodyParser());
		
		api.post('/user', function(req, res) {
			if (logger) {
				logger.info('request POST : /user ? ' + JSON.stringify(req.body));
			}
			
			getUser.execute(JSON.parse(req.body), new Response(res, logger));
		});
		
		api.put('/issue', function(req, res) {
			
			updateIssue.execute(JSON.parse(req.body), new Response(res, logger));	
			
		});
		
		api.listen(process.env.PORT || 5001,function () {
			logger.config(config.name + ' up and ready');
		});
	}
}

module.exports = Server;

})();