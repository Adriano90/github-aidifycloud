(function() {

'use strict';

class UpdateIssue {

	constructor(repo) {
		this.repo = repo;
	}

	execute(params, res) {
		this.repo
			.save(params)
			.then(function(result) {
				res && res.ok(result);
			})
			.catch(function(err) {
				res && res.ko(err);
			});
	}
}

module.exports = UpdateIssue;

})();