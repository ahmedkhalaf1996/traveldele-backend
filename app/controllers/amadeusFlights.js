const config = require(__base + "app/config/index");
var Amadeus = require("amadeus");

var amadeus = new Amadeus({
  clientId: config.amadeus_api_key,
  clientSecret: config.amadeus_api_secret
});

module.exports = {
  getFlights: async (req, res, next) => {
    const resp = await amadeus.shopping.flightOffers.get({
      origin: req.query.origin,
      destination: req.query.destination,
      departureDate: req.query.departureDate
    });
    res.json({
      origin: req.query.origin,
      destination: req.query.destination,
      departureDate: req.query.departureDate,
      data: resp.data
    });
  },
  getFlightsNoDate: async (req, res, next) => {
    const resp = await amadeus.shopping.flightDates.get({
      origin: req.query.origin,
      destination: req.query.destination
    });
    res.json(resp);
  },
  getFlightsNoDest: async (req, res, next) => {
    const resp = await amadeus.shopping.flightDestinations.get({
      origin: req.query.origin
    });
    res.json(resp);
  },
  getLocation: async (req, res, next) => {
    const resp = amadeus.referenceData.locations.get({
      keyword: req.query.keyword,
      subType: Amadeus.location.any
    });
    res.json(resp);
  },
  getAirports: async (req, res, next) => {
    const resp = await amadeus.referenceData.locations.airports.get({
      longitude: req.query.lon,
      latitude: req.query.lat
    });
    res.json(resp.data);
  },
  flightCheckIn: async (req, res, next) => {
    const resp = await amadeus.sreferenceData.urls.checkinLinks.get({
      airlineCode: req.query.cityCode
    });
    res.json(resp);
  },
  getAirlineCode: async (req, res, next) => {
    const resp = await amadeus.referenceData.airlines.get({
      airlineCodes: req.query.airlinecode
    });
    res.json(resp);
  },
  // Airports and City Search (autocomplete)
  getLocations: async (req, res, next) => {
    const resp = await amadeus.referenceData.locations.get({
      keyword: req.query.keyword,
      subType: Amadeus.location.any
    });
    res.json(resp);
  },
  // Get specific location
  getExactLocation: async (req, res, next) => {
    const resp = await amadeus.referenceData.location(req.query.code).get();
    res.json(resp);
  },
  // Flight Most Searched Destinations
  getMostSearched: async (req, res, next) => {
    const resp = await amadeus.travel.analytics.airTraffic.searched.get({
      originCityCode: req.query.origin,
      searchPeriod: req.query.date,
      marketCountryCode: req.query.countryCode
    });
    res.json(resp);
  },
  // Flight Most Searched Destinations
  getPeopleVisited: async (req, res, next) => {
    const resp = await amadeus.travel.analytics.airTraffic.searchedByDestination.get(
      {
        originCityCode: req.query.origin,
        destinationCityCode: req.query.dest,
        searchPeriod: req.query.date,
        marketCountryCode: req.query.countryCode
      }
    );
    res.json(resp);
  },
  // Most Booked Destinations
  getMostSearched: async (req, res, next) => {
    const resp = await amadeus.travel.analytics.airTraffic.booked.get({
      originCityCode: req.query.origin,
      period: req.query.date
    });
    res.json(resp);
  },
  // Most Traveled Destinations
  getMostTraveled: async (req, res, next) => {
    const resp = await amadeus.travel.analytics.airTraffic.traveled.get({
      originCityCode: req.query.origin,
      period: req.query.date
    });
    res.json(resp);
  },
  // Flight Busiest Traveling Period
  getBusiestTime: async (req, res, next) => {
    const resp = await amadeus.travel.analytics.airTraffic.busiestPeriod.get({
      cityCode: req.query.origin,
      period: req.query.date,
      direction: Amadeus.direction.arriving
    });
    res.json(resp);
  }
};
