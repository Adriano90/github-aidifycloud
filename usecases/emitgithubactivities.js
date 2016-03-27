(function() {

'use strict';

class EmitGitHubActivitiesUseCase {

	constructor(gitHubRepository, brokerRepository) {
		this.gitHubRepository = gitHubRepository;
		this.brokerRepository = brokerRepository;
	}
	
	execute(date) {
		let self = this;
		this.gitHubRepository
			.getActivities(date)
			.then(function(activities){
				activities.forEach(
					(elem) => {
						self.brokerRepository.emitActivity(elem);
					}
				);
				
			})
			.catch(function(err){
				console.log("EmitGitHubActivities use case error: " + err);
			});
	}
}

module.exports = EmitGitHubActivitiesUseCase;

})();