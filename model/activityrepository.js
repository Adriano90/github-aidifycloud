(function() {

'use strict';

const _ = require('lodash');

class ActivityRepository {

	constructor(logger, github, redis, mapper) {
		this.github = github;
		this.redis = redis;
		this.mapper = mapper;
		this.logger = logger;
	}
	
	getByDate(date) {
		let self = this;
		return new Promise(function (resolve,reject) {
			let query = {
				org: process.env.AIDIFYCLOUD_ORGANIZATION
			};
			self.github.events.getFromOrg(query, function(err, res) {
				if (err) {
					reject(JSON.parse(err).message);
					return;
				}
				
				let activities = res.filter((elem) => {
					let createdAt = new Date(elem.created_at);
					return createdAt > date;
				})
				
				resolve(_.compact(_.flatMap(activities, self.mapper.fromGitHub)));
			});
		});
	}

	save(activity) {
		let action = "SET_POINTS";
		let activityValue = JSON.stringify(activity);
		let message = `${action}:${activityValue}`;
		this.logger.info("Emit Activity: " + message);
		this.redis.publish('SERVICE:POINTSSERVICE', message);
	}
}

module.exports = ActivityRepository;

})();