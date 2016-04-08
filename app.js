(function(){

'use strict';

const Logger = require('./interfaces/logger');
const env = require('node-env-file');
env(__dirname + '/.env');

// Create redis client
let redis = require("redis");
let redisClient = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);
redisClient.auth(process.env.REDIS_PASSWORD);

// Create GitHub api
const GitHubApi = require('github');
let github = new GitHubApi({
				version: process.env.GITHUB_VERSION,
				debug: process.env.GITHUB_DEBUG,
				protocol: process.env.GITHUB_PROTOCOL,
				host: process.env.GITHUB_HOST,
				headers: {
					"user-agent": process.env.GITHUB_USERAGENT
				}
			});

// Webservice bootstrap
const Server = require('./webservice/server');
const GetUserUseCase = require('./usecases/getuser');
const UserRepository = require('./model/userrepository');
const UpdateIssueUseCase = require('./usecases/updateissue');
const IssueRepository = require('./model/issuerepository');
const UserMapper = require('./model/usermapper');

let userRepository = new UserRepository(new Logger(), github, redisClient, UserMapper);
let issueRepository = new IssueRepository(new Logger(), github);
let getUserUseCase = new GetUserUseCase(userRepository);
let updateIssueUseCase = new UpdateIssueUseCase(issueRepository);
let webservice = new Server(new Logger(), getUserUseCase, updateIssueUseCase);

// Cron bootstrap
const Cron = require('./interfaces/cron.js');
const GetActivitiesUseCase = require('./usecases/getactivities');
const ActivityRepository = require('./model/activityrepository');
const ActivityMapper = require('./model/activitymapper');
let activityRepository = new ActivityRepository(new Logger(), github, redisClient, ActivityMapper);

let getActivitiesUseCase = new GetActivitiesUseCase(activityRepository);
let scheduler = new Cron(new Logger(), getActivitiesUseCase);

})();