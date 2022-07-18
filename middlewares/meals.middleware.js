const { Meal } = require('../models/meal.model');
const { Restaurant } = require('../models/restaurant.model');

const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const mealExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const meal = await Meal.findOne({
    attributes: ['id', 'name', 'price'],
    include: [
      {
        model: Restaurant,
        attributes: ['id', 'name', 'address', 'rating', 'status'],
      },
    ],
    where: { id, status: 'active' },
  });

  if (!meal) {
    return next(
      new AppError('Meal does not exist with given Id or is disabled', 404)
    );
  }
  req.meal = meal;
  next();
});

module.exports = { mealExists };
