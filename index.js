// Node Module dependencies
var path = require('path');
var bunyan = require('bunyan');
var bformat = require('bunyan-format');
var argv = require('minimist')(process.argv.slice(2));
var mail_handler = require('./task/mail_handler');



// Get the current environment
var ENV = argv.env || argv.e  ||  'dev';
var envConfigPath = path.join(__dirname, 'config/', ENV + '.json');

var envConfig = require(envConfigPath);

function Worker(_envConfig) {

	// private members
	var config = false;
	var log = false;

	return 	 {
		init: init
	};

	/////////////////////////////////////////////////////////////////////////////////////////


	/**
	 * Initializing the worker
	 *
	 * @public
	 *
	 * @memberof   Worker
	 *
	 * @author     shoaibmerchant
	 *
	 * @return     {boolean}  Acknowledge
	 */
	function init() {

		config = _envConfig;

		// check the config
		if (!config) {
			console.log('[FATAL] EnvConfig not specified, init failed');
			return false;
		}

		// Initialize the logger
		_initLogging();
		mail_handler.listner();


		
	}

	/**
	 * Initialize the logging
	 *
	 * @private
	 *
	 * @memberof   Worker
	 *
	 * @author     shoaibmerchant
	 *
	 * @return     {boolean}  { description_of_the_return_value }
	 */
	function _initLogging() {
		var logStreams = config.logs.streams;

		logStreams.push({
			stream: bformat({
				outputMode: 'short'
			}),
			level: config.logs.level
		});

		log = bunyan.createLogger({
			name: config.appName,
			streams: logStreams
		});

		log.info('Current Environment:', ENV);
		
		return true;
	}

}

// Initialize the worker
var worker = Worker(envConfig);
worker.init();
