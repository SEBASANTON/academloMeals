//Models
const { Restaurant } = require('../models/restaurant.model');

//Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const getAllRestaurants = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
  });
});

const createRestaurants = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
  });
});

const getRestaurantById = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
  });
});

const updateRestaurant = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
  });
});

const deleteRestaurant = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
  });
});

const createReviewById = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
  });
});

const updateReview = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
  });
});

const deleteReview = catchAsync(async (req, res, next) => {
  res.status(200).json({
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
};
