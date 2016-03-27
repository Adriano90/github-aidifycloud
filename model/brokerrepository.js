(function() {

'use strict';

let redis = require("redis");

class Broker {

	constructor(logger) {
		this.client = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);
		this.client.auth(process.env.REDIS_PASSWORD);
		this.logger = logger;
	}
	
	saveUser(user) {
		let action = "CREATE_USER";
		let userValue = JSON.stringify(user);
		let message = `${action}:${userValue}`;
		this.logger.info("Emit User: " + message);
		this.client.publish('SERVICE:USERMANAGEMENT', message);
	}

	saveActivity(activity) {
		let action = "CREATE_ACTIVITY";
		let activityValue = JSON.stringify(activity);
		let message = `${action}:${activityValue}`;
		this.logger.info("Emit Activity: " + message);
		this.client.publish('SERVICE:ACTIVITYMANAGEMENT', message);
	}
}

module.exports = Broker;

})();