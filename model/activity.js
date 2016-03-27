(function() {

'use strict';

class Activity {

	constructor(id, type, action, user, repo) {
		this.id = id;
		this.type = type;
		this.action = action;
		this.user = user;
		this.repo = repo;
	}
}

module.exports = Activity;

})();