(function() {

'use strict';

class User {

	constructor(id, login, name, avatar) {
		this.id = id;
		this.login = login;
		this.name = name;
		this.avatar = avatar;
	}

}

module.exports = User;

})();