(function() {

'use strict';

class GetUserUseCase {
	
	constructor(externalUserRepository, internalUserRepository) {
		this.externalUserRepository = externalUserRepository;
		this.internalUserRepository = internalUserRepository;
	}
	
	execute(params, res) {
		let login = params.login;
		let self = this;
		this.externalUserRepository
			.getUser(login)
			.then(function(user){
				self.internalUserRepository.saveUser(user);
				res.ok(user);
			})
			.catch(function(err){
				console.log("GetUserUseCase error: " + err);
				res.ko(err);
			});
	}
}

module.exports = GetUserUseCase;

})();