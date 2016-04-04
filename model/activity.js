(function() {

'use strict';

class Activity {

	constructor(id, type, action, user, repo, createdAt) {
		this.id = id;
		this.type = type;
		this.action = action;
		this.user = user;
		this.repo = repo;
		this.createdAt = createdAt;
	}
}

module.exports = Activity;

})();