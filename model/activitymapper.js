(function() {

'use strict';

const Activity = require('./activity');
const MASTER = "refs/heads/master";
const PUSH_EVENT = "PushEvent";
const ISSUES_EVENT = "IssuesEvent";
const PULL_REQUEST_EVENT = "PullRequestEvent";
const COMMIT = "commit";
const CREATED = "created";
const MERGED = "merged";

module.exports.fromGitHub = function(gitHubActivity) {
	
	if (PUSH_EVENT == gitHubActivity.type && MASTER == gitHubActivity.payload.ref) {
		
		let activities = gitHubActivity.payload.commits.map((elem) => {
			return new Activity(gitHubActivity.id, COMMIT, CREATED,
				elem.author.name, gitHubActivity.repo.name, gitHubActivity.created_at);
		});
		
		activities.push(new Activity(gitHubActivity.id, PUSH_EVENT.toLowerCase(), CREATED,
			gitHubActivity.actor.login, gitHubActivity.repo.name, gitHubActivity.created_at));
		
		return activities;
		
	} else if (ISSUES_EVENT == gitHubActivity.type) {
		
		if (!gitHubActivity.payload.issue.assignee) {
			return null;
		}
		
		return new Activity(gitHubActivity.id, ISSUES_EVENT.toLowerCase(),
			gitHubActivity.payload.action, gitHubActivity.payload.issue.assignee.login,
			gitHubActivity.repo.name, gitHubActivity.created_at, gitHubActivity.actor.login,
			gitHubActivity.payload.issue.title, gitHubActivity.payload.issue.body);
			
	} else if (PULL_REQUEST_EVENT == gitHubActivity.type) {
		
		let action = (!gitHubActivity.payload.pull_request.merged_at) ? gitHubActivity.payload.action : MERGED;
		return new Activity(gitHubActivity.id, PULL_REQUEST_EVENT.toLowerCase(),
			action, gitHubActivity.payload.pull_request.user.login,
			gitHubActivity.repo.name, gitHubActivity.created_at, gitHubActivity.actor.login,
			gitHubActivity.payload.pull_request.title, gitHubActivity.payload.pull_request.body);
			
	}
	
	return null;
}

})();