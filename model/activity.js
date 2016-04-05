(function() {

'use strict';

class Activity {

	constructor(id, type, action, user, repo, createdAt, title, body) {
		this.id = id;
		this.type = type;
		this.action = action;
		this.user = user;
		this.repo = repo;
		this.createdAt = createdAt;
		this.title = title;
		this.body = body;
	}
}

module.exports = Activity;

})();