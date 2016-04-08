(function() {

'use strict';

class IssueRepository {

	constructor(logger, github) {
		this.github = github;
		this.logger = logger;
	}
	
	save(issue) {
		let self = this;
		return new Promise(function(resolve, reject) {
			
			self.github.authenticate({
				type: "oauth",
				token: process.env.GITHUB_TOKEN
			});
			
			self.github.issues.edit(issue, function(err, res) {
				if (err) {
					self.logger.error(err);
					return reject(err);
				}

				resolve(true);
			});
		});
	}
}

module.exports = IssueRepository;

})();