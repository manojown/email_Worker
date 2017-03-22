
var MailSchema = require('../models/mailSchema');
var pushService = require('./MailPusherService');


function connection(){



return {
	insert : insertdoc
};

function insertdoc(newmail){

	var mail = {};
		mail.from = newmail.from[0].address;
		mail.name = newmail.from[0].name;
		mail.subject = newmail.subject;
		mail.html = newmail.html;
		mail.date = newmail.date;
		mail.messageId = newmail.messageId;
		mail.to = newmail.to;
	
	if(newmail.attachments){
		//mail.attachment = newmail.attachments[0];
	}
	//console.log(mail);




	if(newmail.inReplyTo){
		MailSchema.update({messageId: newmail.references[0]},{ $push: { inReplyTo: mail } } ,function(err, users) {
	  		if (err) throw err;
	  		//console.log('mail data array ',users);
	  		MailSchema.find({}).then(function(res){
	  			//pusher is to imidiate and change data in real time
	  			pushService.trigger(res);
	  		}).catch(function(err){
	  	 	console.log(err);
	  		});

		});
	}else{
		var Mail = new  MailSchema(mail);
		Mail.save(function(err) {
	 	 	if (err) throw err;
	 	 	MailSchema.find({}).then(function(res){
	  			//pusher is to imidiate and change data in real time
	  			pushService.trigger(res);
	  		}).catch(function(err){
	  	 	console.log(err);
	  		});
	  		console.log('User saved successfully!');
		});
	}


}

}


module.exports = connection();



