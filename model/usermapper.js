(function() {

'use strict';

const User = require('./user');

module.exports.userFromGitHub = function(gitHubUser) {

	return new User(gitHubUser.id, gitHubUser.login);
}

})();