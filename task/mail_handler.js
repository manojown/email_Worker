var path = require('path');
var notifier = require('mail-notifier');
var Database = require('./database');
var argv = require('minimist')(process.argv.slice(2));

//var env = arg['env'] || 'dev';
var envConfig = require(path.join('../config/dev'));
var imap = envConfig.imap;
var mail = notifier(imap);


function mail_handler(){
console.log("print in listner");
	return {
		listner:listner
	};

	function listner(){
		console.log("print in listner");
		mail.on('end', function () { // session closed
		  mail.start();
		}).on('mail',function(mail){
		  
		  Database.insert(mail);
		 
		}).start();
	}

}
module.exports = mail_handler();


