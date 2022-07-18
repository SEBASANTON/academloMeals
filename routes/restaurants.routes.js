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
  getAllReviews,
  deleteReview,
} = require('../controllers/restaurants.controller');

//Middlewares
const { restaurantExists } = require('../middlewares/restaurants.middleware');
const { reviewExists } = require('../middlewares/reviews.middleware');
const {
  createRestaurantValidators,
} = require('../middlewares/validators.middleware');
const {
  protectSesssion,
  protectReview,
  protectAdmin,
} = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', getAllRestaurants);

router.get('/:id', restaurantExists, getRestaurantById);

router.get('/reviews/todo/junto', getAllReviews);

router.use(protectSesssion);

router.post('/', createRestaurantValidators, createRestaurants);

router.post('/reviews/:restaurantId', createReviewById);

router
  .use('/reviews/:id', reviewExists, protectReview)
  .route('/reviews/:id')
  .patch(updateReview)
  .delete(deleteReview);

router
  .use('/:id', restaurantExists, protectAdmin)
  .route('/:id')
  .patch(updateRestaurant)
  .delete(deleteRestaurant);

module.exports = { restaurantsRouter: router };
