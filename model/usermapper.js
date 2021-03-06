(function() {

'use strict';

const User = require('./user');

module.exports.fromGitHub = function(gitHubUser) {

	return new User(gitHubUser.id, gitHubUser.login, gitHubUser.name, gitHubUser.avatar_url);
}

})();