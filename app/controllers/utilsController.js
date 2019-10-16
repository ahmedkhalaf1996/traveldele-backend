const config = require(__base + "app/config/index");
var geoip = require("geoip-lite");
var airports = require('airport-codes');
var imagefinder = require('imagefinder');

module.exports = {
  getIP: async (req, res, next) => {
    var ip =
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      (req.connection.socket ? req.connection.socket.remoteAddress : null);
    var geo = geoip.lookup("89.149.195.248");
    // var geo = geoip.lookup(ip);
    res.json(geo);
  },

  getAiroport: async (req, res, next) => {
    res.json(require('airport-codes').toJSON());
  },

  getImg: async (req, res, next) => {
    imagefinder({
      keyword: req.query.text
    }).then(images => {
      res.json({images: images, destination: req.query.destination});
    })
  }
};
