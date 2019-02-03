var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var secret = require('../config').secret;

var DeviceSchema = new mongoose.Schema({
    uid: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
    email: {type: String, lowercase: true, unique: true, required: false, match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
    
    hash: String,
    salt: String
  }, {timestamps: true});

  DeviceSchema.plugin(uniqueValidator, {message: 'is already taken.'});

DeviceSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

DeviceSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

DeviceSchema.methods.generateJWT = function() {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    id: this._id,
    uid: this.uid,
    exp: parseInt(exp.getTime() / 1000),
  }, secret);
};

DeviceSchema.methods.toAuthJSON = function(){
  return {
    uid: this.uid,
    email: this.email,
    token: this.generateJWT(),
    bio: this.bio,
    image: this.image
  };
};
mongoose.model('Device', DeviceSchema);