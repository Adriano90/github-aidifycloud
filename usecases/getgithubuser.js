(function() {

'use strict';

class GetGitHubUserUseCase {
	
	constructor(gitHubRepository, brokerRepository) {
		this.gitHubRepository = gitHubRepository;
		this.brokerRepository = brokerRepository;
	}
	
	execute(params, res) {
		let login = params.login;
		let self = this;
		this.gitHubRepository
			.getUser(login)
			.then(function(user){
				self.brokerRepository.emitUser(user);
				res.ok(user);
			})
			.catch(function(err){
				console.log("GetGitHubInfoUseCase use case error: " + err);
				res.ko(err);
			});
	}
}

module.exports = GetGitHubUserUseCase;

})();