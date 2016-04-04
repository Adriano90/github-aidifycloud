(function() {

'use strict';

const CronJob = require('cron').CronJob;

class Cron {

	constructor(logger, getActivities) {
		this.getActivities = getActivities;
		let self = this;
		try {
			new CronJob(process.env.CRON_EXPRESSION, 
				function() {
					let date = new Date();
					date.setHours(date.getHours() - 1);
					logger.info("Executing cron process with date: " + date.toISOString());
					self.getActivities.execute(date)
				}, null, true, 'Europe/Madrid'
			);
		} catch(ex) {
			logger.error("cron pattern not valid");
		}
	}

}

module.exports = Cron;

})();