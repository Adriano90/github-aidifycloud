(function() {

'use strict';

class GetActivitiesUseCase {

	constructor(externalRepository, internalRepository) {
		this.externalRepository = externalRepository;
		this.internalRepository = internalRepository;
	}
	
	execute(date) {
		let self = this;
		this.externalRepository
			.getActivities(date)
			.then(function(activities){
				activities.forEach(
					(elem) => {
						self.internalRepository.saveActivity(elem);
					}
				);
				
			})
			.catch(function(err){
				console.log("GetActivitiesUseCase error: " + err);
			});
	}
}

module.exports = GetActivitiesUseCase;

})();