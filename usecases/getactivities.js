(function() {

'use strict';

class GetActivitiesUseCase {

	constructor(activityRepository) {
		this.activityRepository = activityRepository;
	}
	
	execute(date) {
		let self = this;
		this.activityRepository
			.getByDate(date)
			.then(function(activities){
				console.log("Num. of activities to save: %d", activities.length);
				activities.forEach(
					(elem) => {
						self.activityRepository.save(elem);
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