(function() {

'use strict';

class Activity {

	constructor(id, type, action, user, repo, createdAt, eventUser, title, body, link) {
		this.id = id;
		this.type = type;
		this.action = action;
		this.user = user;
		this.repo = repo;
		this.createdAt = createdAt;
		this.eventUser = eventUser;
		this.title = title;
		this.body = body;
		this.link = link;
	}
}

module.exports = Activity;

})();