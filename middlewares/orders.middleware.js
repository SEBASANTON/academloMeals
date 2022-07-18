const { Order } = require('../models/order.model');
const { Meal } = require('../models/meal.model');
const { Restaurant } = require('../models/restaurant.model');

const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const orderExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findOne({
    attributes: ['id', 'userId', 'quantity', 'totalPrice', 'status'],
    include: [
      {
        model: Meal,
        attributes: ['id', 'name', 'price'],
        include: {
          model: Restaurant,
          attributes: ['id', 'name', 'address', 'rating', 'status'],
        },
      },
    ],
    where: { id, status: 'active' },
  });

  if (!order) {
    return next(
      new AppError('Order does not exist with given Id or is disabled', 404)
    );
  }

  req.order = order;
  next();
});

module.exports = { orderExists };
