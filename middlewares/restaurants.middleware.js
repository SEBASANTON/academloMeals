const { Restaurant } = require('../models/restaurant.model');
const { Review } = require('../models/review.model');

const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const restaurantExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const restaurant = await Restaurant.findOne({
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
      },
    ],
    where: { id, status: 'active' },
  });

  if (!restaurant) {
    return next(
      new AppError(
        'Restaurant does not exist with given Id or is disabled',
        404
      )
    );
  }

  req.restaurant = restaurant;
  next();
});

module.exports = { restaurantExists };
