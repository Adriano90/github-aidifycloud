(function() {

'use strict';

const CronJob = require('cron').CronJob;

class Cron {

	constructor(logger, emitGitHubEvents) {
		this.emitGitHubEvents = emitGitHubEvents;
		let self = this;
		try {
			new CronJob('0 0 * * * *', 
				function() {
					let date = new Date();
					date.setHours(date.getHours() - 1);
					self.emitGitHubEvents.execute(date)
				}, null, true, 'Europe/Madrid'
			);
		} catch(ex) {
			logger.error("cron pattern not valid");
		}
	}

}

module.exports = Cron;

})();