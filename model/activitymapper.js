(function() {

'use strict';

const Activity = require('./activity');
const MASTER = "refs/heads/master";
const PUSH_EVENT = "PushEvent";

module.exports.fromGitHub = function(gitHubActivity) {
	
	if (PUSH_EVENT == gitHubActivity.type && MASTER == gitHubActivity.payload.ref) {
		return gitHubActivity.payload.commits.map((elem) => {
			return new Activity(gitHubActivity.id, "COMMIT", null, elem.author.name, gitHubActivity.repo.name);
		});
	}
	
	return null;
}

})();