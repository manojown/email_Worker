var Pusher = require('pusher');

// var Logger = require('./Logger');



function MailPusherService() {

  return {
      trigger: trigger,
     
    
    };


/**
 * trigger
 *
 * @public
 *
 * @memberof   pusher service
 *
 * @author     manoj
 *
 * @param      {object}  data   
 */
 //www.pusher.com use for socket  work
function trigger(data){

  var pusher = new Pusher({
  appId: YourPusherAppID,
  key: PusherKey,
  secret: PusherSecret,
  cluster: pusherCluster,
  encrypted: true
});

  
	pusher.trigger(YourChennal_Name, YourEventName, {
	  "result": data //is data which  you want to send 
	});

}
}
module.exports = MailPusherService();