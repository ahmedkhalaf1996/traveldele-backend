const config = require(__base + "app/config/index");
var Amadeus = require("amadeus");

var amadeus = new Amadeus({
  clientId: config.amadeus_api_key,
  clientSecret: config.amadeus_api_secret
});

module.exports = {
  // Get list of hotels by city code
  getHotelsByCity: async (req, res, next) => {
    const resp = await amadeus.shopping.hotelOffers.get({
      cityCode: req.query.city
    });
    res.json(resp);
  },
  // Get list of offers for a specific hotel
  getHotelOffers: async (req, res, next) => {
    const resp = await amadeus.shopping.hotelOffersByHotel.get({
      hotelId: req.query.hotelId
    });
    res.json(resp);
  },
  // Confirm the availability of a specific offer id
  confirmHotelOffer: async (req, res, next) => {
    const resp = await amadeus.shopping.hotelOffer(req.query.offerId).get();
    res.json(resp);
  },
  // What are the popular places in a city (based a geo location and a radius)
  getPopularPlaces: async (req, res, next) => {
    const resp = await amadeus.referenceData.locations.pointsOfInterest.get({
      latitude: req.query.latitude,
      longitude: req.query.longitude
    });
    res.json(resp);
  },
  // What are the popular places in a square? (based on a square)
  getPopularPlacesSq: async (req, res, next) => {
    const resp = await amadeus.referenceData.locations.pointsOfInterest.bySquare.get(
      {
        north: 41.397158,
        west: 2.160873,
        south: 41.394582,
        east: 2.177181
      }
    );
    res.json(resp);
  },
  // Get Sentiment Analysis of reviews about a hotel
  getHotelSentiments: async (req, res, next) => {
    const resp = await amadeus.eReputation.hotelSentiments.get({
      hotelIds: req.origin.hotelId
    });
    res.json(resp);
  },
  getHotelByCity: async(req, res ,next) => {
    const resp = await amadeus.shopping.hotelOffers.get({
      cityCode :  req.query.cityCode
    })
    res.json({
      data: resp.data
    });
    }
};
