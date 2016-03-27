(function() {

'use strict';

const GitHubApi = require('github');
const _ = require('lodash');

class GitHubRespository {

	constructor(userMapper, activityMapper){
		this.github = new GitHubApi({
			version: process.env.GITHUB_VERSION,
			debug: process.env.GITHUB_DEBUG,
			protocol: process.env.GITHUB_PROTOCOL,
			host: process.env.GITHUB_HOST,
			headers: {
				"user-agent": process.env.GITHUB_USERAGENT
			}
		});
		this.userMapper = userMapper;
		this.activityMapper = activityMapper;
	}
	
	getUser(login) {
		var self = this;
		return new Promise(function (resolve,reject) {
			self.github.user.getFrom({user: login}, function(err, res) {
				if (err) {
					reject(JSON.parse(err).message);
					return;
				}
				
				resolve(self.userMapper.userFromGitHub(res));
			});
		});
	}

	getActivities(date) {
		var self = this;
		return new Promise(function (resolve,reject) {
			
			var query = {
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
				
				resolve(_.compact(_.flatMap(activities, self.activityMapper.activityFromGitHub)));
			});
		});
	}
}

module.exports = GitHubRespository;

})();