(function() {

'use strict'

const _ = require('lodash');
let configLog = _.template('[<%= date %>] CONFIG > <%= message %>');
let infoLog = _.template('[<%= date %>] INFO > <%= message %>');
let errorLog = _.template('[<%= date %>] ERROR > <%= message %>');

class Logger {

  config (config) {
    console.log(configLog({ date:Date(), message:config }));
  }
  
  info (log) {
    console.log(infoLog({ date:Date(), message:log }));
  }
  
  error (err) {
    console.error(errorLog({ date:Date(), message:err }));
  }
}

module.exports = Logger;

})();