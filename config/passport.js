var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var Device = mongoose.model('Device');

passport.use(new LocalStrategy({
  usernameField: 'device[email]',
  passwordField: 'device[password]'
}, function(email, password, done) {
  Device.findOne({email: email}).then(function(device){
    if(!device || !device.validPassword(password)){
      return done(null, false, {errors: {'email or password': 'is invalid'}});
    }

    return done(null, device);
  }).catch(done);
}));

passport.use(new LocalStrategy({
  usernameField: 'device[uid]',
  passwordField: 'device[password]'
}, function(uid, password, done) {
  Device.findOne({uid: uid}).then(function(device){
    if(!device || !device.validPassword(password)){
      return done(null, false, {errors: {'uid or password': 'is invalid'}});
    }

    return done(null, device);
  }).catch(done);
}));
