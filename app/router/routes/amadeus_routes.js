const express = require('express');
const router = require('express-promise-router')();
const amadeusFlights = require(__base + 'app/controllers/amadeusFlights');
const amadeusHotels = require(__base + 'app/controllers/amadeusHotels');
const utilsController = require(__base + 'app/controllers/utilsController');

// Flights




// very important 
//   http://localhost:4000/api/v1/search-flights?origin=NYC&destination=MAD&departureDate=2019-12-01
/// very importat 

// router.get("/search-flights", async (req, res, next)=>{
//     var amadeus = new Amadeus({
//         clientId: config.amadeus_api_key,
//         clientSecret: config.amadeus_api_secret
//       });
//   //  let amadeus = new Amadeus();


//     const resp = await   amadeus.shopping.flightOffers.get({
//         origin : 'NYC',
//         destination : 'MAD',
//         departureDate : '2019-12-01'
//       })
//       res.json({
//         data: resp.data
//       });

//   });



router.route('/search-flights').get(amadeusFlights.getFlights);

router.route('/search-flights-no-date').get(amadeusFlights.getFlightsNoDate);

router.route('/get-airports').get(amadeusFlights.getAirports);

router.route('/get-flights-no-dest').get(amadeusFlights.getFlightsNoDest);

router.route('/get-location').get(amadeusFlights.getLocation);

router.route('/flight-check-in').get(amadeusFlights.flightCheckIn);

router.route('/get-airline-code').get(amadeusFlights.getAirlineCode);

router.route('/location-autocomplete').get(amadeusFlights.getLocations);

router.route('/get-location-name').get(amadeusFlights.getExactLocation);

router.route('/get-most-searched').get(amadeusFlights.getMostSearched);

router.route('/get-most-visited').get(amadeusFlights.getPeopleVisited);

router.route('/get-most-searched').get(amadeusFlights.getMostSearched);

router.route('/get-most-traveled').get(amadeusFlights.getMostTraveled);

router.route('/get-busy-time').get(amadeusFlights.getBusiestTime);

// Hotels
// get-hotele-by-city
router.route('/get-hotele-by-city').get(amadeusHotels.getHotelByCity);

router.route('/get-hotel-offers').get(amadeusHotels.getHotelOffers);

router.route('confirm-offer').get(amadeusHotels.confirmHotelOffer);

router.route('/get-popular-places').get(amadeusHotels.getPopularPlaces);

router.route('/get-popular-places-sq').get(amadeusHotels.getPopularPlacesSq);

router.route('/get-hotel-sentiments').get(amadeusHotels.getHotelSentiments);

router.route('/get-ip').get(utilsController.getIP);

router.route('/get-img').get(utilsController.getImg);

module.exports = router;
