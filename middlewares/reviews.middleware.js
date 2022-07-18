const { Review } = require('../models/review.model');

const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const reviewExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const review = await Review.findOne({ where: { id, status: 'active' } });

  if (!review) {
    return next(
      new AppError('Review does not exist with given Id or is disabled', 404)
    );
  }
  
  req.review = review;
  next();
});

module.exports = { reviewExists };
