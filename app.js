(function(){

'use strict';

const Logger = require('./interfaces/logger');
const env = require('node-env-file');
env(__dirname + '/.env');

// Webservice bootstrap

const Server = require('./webservice/server');
const GetUserUseCase = require('./usecases/getuser');
const GitHubRepository = require('./model/githubrepository');
const Broker = require('./model/brokerrepository');
const UserMapper = require('./model/usermapper');
const ActivityMapper = require('./model/activitymapper');

let broker = new Broker(new Logger());
let gitHubRepository = new GitHubRepository(UserMapper, ActivityMapper);
let getUserUseCase = new GetUserUseCase(gitHubRepository, broker);
let webservice = new Server(new Logger(), getUserUseCase);

// Cron bootstrap

const Cron = require('./interfaces/cron.js');
const GetActivitiesUseCase = require('./usecases/getactivities');

let getActivitiesUseCase = new GetActivitiesUseCase(gitHubRepository, broker);
let scheduler = new Cron(new Logger(), getActivitiesUseCase);

})();