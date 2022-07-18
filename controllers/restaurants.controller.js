//Models
const { Restaurant } = require('../models/restaurant.model');
const { Review } = require('../models/review.model');

//Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');
const { Op } = require('sequelize');

const getAllRestaurants = catchAsync(async (req, res, next) => {
  const restaurant = await Restaurant.findAll({
    attributes: ['id', 'name', 'address', 'rating'],
    include: [
      {
        model: Review,
        attributes: [
          'id',
          'userId',
          'comment',
          'restaurantId',
          'rating',
          'status',
        ],
        /* where: {
          status: { [Op.or]: { [Op.ne]: 'disabled', [Op.is]: null } },
        }, */
      },
    ],
    where: { status: { [Op.ne]: 'disabled' } },
  });

  res.status(200).json({
    status: 'success',
    restaurant,
  });
});

const createRestaurants = catchAsync(async (req, res, next) => {
  const { name, address, rating } = req.body;

  const newUser = await Restaurant.create({
    name,
    address,
    rating,
  });

  res.status(201).json({
    status: 'success',
    newUser,
  });
});

const getRestaurantById = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  res.status(200).json({
    status: 'success',
    restaurant,
  });
});

const updateRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;
  const { name, address } = req.body;

  await restaurant.update({ name, address });

  res.status(204).json({
    status: 'success',
  });
});

const deleteRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  await restaurant.update({ status: 'disabled' });

  res.status(204).json({
    status: 'success',
  });
});

const getAllReviews = catchAsync(async (req, res, next) => {
  const review = await Review.findAll({
    where: { status: 'active' },
  });

  res.status(200).json({
    status: 'success',
    review,
  });
});

const createReviewById = catchAsync(async (req, res, next) => {
  const { restaurantId } = req.params;
  const { comment, rating } = req.body;
  const { sessionUser } = req;

  const restaurant = await Restaurant.findOne({
    where: { id: restaurantId, status: 'active' },
  });

  if (restaurant) {
    const newReview = await Review.create({
      userId: sessionUser.id,
      comment,
      restaurantId,
      rating,
    });

    res.status(201).json({
      status: 'success',
      newReview,
    });
  } else {
    return next(
      new AppError(
        'Restaurant does not exist with given Id or is disabled',
        404
      )
    );
  }
});

const updateReview = catchAsync(async (req, res, next) => {
  const { review } = req;
  const { comment, rating } = req.body;

  await review.update({ comment, rating });

  res.status(204).json({
    status: 'success',
  });
});

const deleteReview = catchAsync(async (req, res, next) => {
  const { review } = req;

  await review.update({ status: 'disabled' });

  res.status(204).json({
    status: 'success',
  });
});

module.exports = {
  getAllRestaurants,
  createRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  createReviewById,
  updateReview,
  deleteReview,
  getAllReviews,
};
