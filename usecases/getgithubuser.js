(function() {

'use strict';

class GetGitHubUserUseCase {
	
	constructor(gitHubRepository, brokerRepository) {
		this.gitHubRepository = gitHubRepository;
		this.brokerRespository = brokerRepository;
	}
	
	execute(params, res) {
		let login = params.login;
		
		this.gitHubRepository
			.getUser(login)
			.then(function(user){
				brokerRepository.emitUser({
					login: user.login,
					id: user.id
				});
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