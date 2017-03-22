var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/Email');
var Schema = db.Schema;

// create a schema
var mailSchema = new Schema({
  messageId:String,
  from: String,
  to:String,
  name:String,
  subject: String,
  html: String,
  date: { type: String },
  read: {
          type: Boolean,
            default: false
          },
  inReplyTo:[{messageId:{ type: String}, 
  from: String,
  name:String,
  subject: String,
  html: String,
  date: { type: String },
  to:{type:Array}}]
 
});

// the schema is useless so far
// we need to create a model using it
var Mail = mongoose.model('Mail', mailSchema);

// make this available to our users in our Node applications
module.exports = Mail;