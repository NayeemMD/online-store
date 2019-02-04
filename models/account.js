var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var UserAccount = new Schema({
    username: String,
    password: String
});

UserAccount.plugin(passportLocalMongoose);

module.exports = mongoose.model('UserAccount', UserAccount);