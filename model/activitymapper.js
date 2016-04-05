(function() {

'use strict';

const Activity = require('./activity');
const MASTER = "refs/heads/master";
const PUSH_EVENT = "PushEvent";
const ISSUES_EVENT = "IssuesEvent";
const PULL_REQUEST_EVENT = "PullRequestEvent";
const CLOSED = "closed";
const OPENED = "opened";
const REOPENED = "reopened";

module.exports.fromGitHub = function(gitHubActivity) {
	
	if (PUSH_EVENT == gitHubActivity.type && MASTER == gitHubActivity.payload.ref) {
		
		return gitHubActivity.payload.commits.map((elem) => {
			return new Activity(gitHubActivity.id, "commit", "created",
				elem.author.name, gitHubActivity.repo.name, gitHubActivity.created_at);
		});
		
	} else if (ISSUES_EVENT == gitHubActivity.type) {
		
		return new Activity(gitHubActivity.id, ISSUES_EVENT.toLowerCase(),
			gitHubActivity.payload.action, gitHubActivity.user.login,
			gitHubActivity.repo.name, gitHubActivity.created_at,
				gitHubActivity.payload.issue.title, gitHubActivity.payload.issue.body);
			
	} else if (PULL_REQUEST_EVENT == gitHubActivity.type) {
		
		return new Activity(gitHubActivity.id, PULL_REQUEST_EVENT.toLowerCase(),
			gitHubActivity.payload.action, gitHubActivity.payload.pull_request.user.login,
			gitHubActivity.repo.name, gitHubActivity.created_at,
				gitHubActivity.payload.pull_request.title, gitHubActivity.payload.pull_request.body);
			
	}
	
	return null;
}

})();