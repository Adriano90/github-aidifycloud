(function() {

'use strict';

class GetUserUseCase {
	
	constructor(userRepository) {
		this.userRepository = userRepository;
	}
	
	execute(params, res) {
		let login = params.login;
		let self = this;
		this.userRepository
			.get(login)
			.then(function(user){
				self.userRepository.save(user);
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