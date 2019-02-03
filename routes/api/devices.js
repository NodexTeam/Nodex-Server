var mongoose = require('mongoose');
var router = require('express').Router();
var passport = require('passport');
var Device = mongoose.model('Device');
var auth = require('../auth');
var uuid = require('uuid/v4');
const crypto = require("crypto");

router.get('/device', auth.required, function (req, res, next) {
  Device.findById(req.payload.id).then(function (device) {
    if (!device) { return res.sendStatus(401); }

    return res.json({ device: device.toAuthJSON() });
  }).catch(next);
});

router.put('/device', auth.required, function (req, res, next) {
  Device.findById(req.payload.id).then(function (device) {
    if (!device) { return res.sendStatus(401); }

    // only update fields that were actually passed...
    if (typeof req.body.device.uid !== 'undefined') {
      device.uid = req.body.device.uid;
    }
    if (typeof req.body.device.email !== 'undefined') {
      device.email = req.body.device.email;
    }

    if (typeof req.body.device.password !== 'undefined') {
      device.setPassword(req.body.device.password);
    }

    return device.save().then(function () {
      return res.json({ device: device.toAuthJSON() });
    });
  }).catch(next);
});

router.post('/device/login', function (req, res, next) {
  if (!req.body.device.uid) {
    return res.status(422).json({ errors: { uid: "can't be blank" } });
  }

  if (!req.body.device.password) {
    return res.status(422).json({ errors: { password: "can't be blank" } });
  }

  passport.authenticate('local', { session: false }, function (err, device, info) {
    if (err) { return next(err); }

    if (device) {
      device.token = device.generateJWT();
      return res.json({ device: device.toAuthJSON() });
    } else {
      return res.status(422).json(info);
    }
  })(req, res, next);
});

router.post('/users/login', function (req, res, next) {
  if (!req.body.user.email) {
    return res.status(422).json({ errors: { email: "can't be blank" } });
  }

  if (!req.body.user.password) {
    return res.status(422).json({ errors: { password: "can't be blank" } });
  }

  passport.authenticate('local', { session: false }, function (err, device, info) {
    if (err) { return next(err); }

    if (device) {
      device.token = device.generateJWT();
      return res.json({ device: device.toAuthJSON() });
    } else {
      return res.status(422).json(info);
    }
  })(req, res, next);
});

router.get('/device/new', auth.optional, function (req, res, next) {
  var uid = uuid().replace(/-/g, '');
  var pass = crypto.randomBytes(3).toString("hex");

  var dev = { 'uid': uid, 'password': pass };

  return res.json({ device: dev });

})

router.post('/device/new', auth.optional, function (req, res, next) {
  var device = new Device();
  device.uid = req.body.device.uid;
  device.setPassword(req.body.device.password)

  device.save().then(function () {
    return res.json({ device: device.toAuthJSON() });
  }).catch(next);

})

module.exports = router;