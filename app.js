(function(){

'use strict';

const Logger = require('./interfaces/logger');
const env = require('node-env-file');
env(__dirname + '/.env');

// Webservice bootstrap

const Server = require('./webservice/server');
const GetGitHubUserUseCase = require('./usecases/getgithubuser');
const GitHubRepository = require('./model/githubrepository');
const Broker = require('./model/brokerrepository');
const UserMapper = require('./model/usermapper');
const ActivityMapper = require('./model/activitymapper');

let broker = new Broker(new Logger());
let gitHubRepository = new GitHubRepository(UserMapper, ActivityMapper);
let getGitHubUserUseCase = new GetGitHubUserUseCase(gitHubRepository, broker);
let webservice = new Server(new Logger(), getGitHubUserUseCase);

// Cron bootstrap

const Cron = require('./interfaces/cron.js');
const EmitGitHubActivitiesUseCase = require('./usecases/emitgithubactivities');

let emitGitHubActivitiesUseCase = new EmitGitHubActivitiesUseCase(gitHubRepository, broker);
let scheduler = new Cron(new Logger(), emitGitHubActivitiesUseCase);

})();