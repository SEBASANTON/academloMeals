const express = require('express');

//Controllers
const {
  getAllRestaurants,
  createRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  createReviewById,
  updateReview,
  deleteReview,
} = require('../controllers/restaurants.controller');

//Middlewares
const { restaurantExists } = require('../middlewares/restaurants.middleware');

const router = express.Router();

router.route('/').get(getAllRestaurants).post(createRestaurants);

module.exports = { restaurantsRouter: router };
