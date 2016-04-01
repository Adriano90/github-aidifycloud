(function() {

'use strict';

class UserRepository {

	constructor(logger, github, redis, mapper) {
		this.github = github;
		this.redis = redis;
		this.mapper = mapper;
		this.logger = logger;
	}

	get(login) {
		let self = this;
		return new Promise(function (resolve,reject) {
			let query = {user: login};
			self.github.user.getFrom(query, function(err, res) {
				if (err) {
					self.logger.error(err);
					reject(JSON.parse(err).message);
					return;
				}
				resolve(self.mapper.fromGitHub(res));
			});
		});
	}

	save(user) {
		let action = "CREATE_USER";
		let userValue = JSON.stringify(user);
		let message = `${action}:${userValue}`;
		this.logger.info("Emit User: " + message);
		this.redis.publish('SERVICE:USERMANAGEMENT', message);
	}
}

module.exports = UserRepository;

})();