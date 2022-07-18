//Models
const { Order } = require('../models/order.model');

//Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');
const { Meal } = require('../models/meal.model');
const { Restaurant } = require('../models/restaurant.model');
const { Op } = require('sequelize');

const createOrder = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const { quantity, mealId } = req.body;

  const price = await Meal.findOne({ where: { id: mealId } });

  if (!price) {
    return next(
      new AppError('Meal does not exist with given Id or is disabled', 404)
    );
  }

  const totalPrice = price.price * quantity;

  console.log(totalPrice);

  const newOrder = await Order.create({
    mealId,
    userId: sessionUser.id,
    quantity,
    totalPrice,
  });
  res.status(200).json({
    status: 'success',
    newOrder,
  });
});

const getOrderMe = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const orders = await Order.findAll({
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
    where: {
      userId: sessionUser.id,
      status: { [Op.ne]: 'cancelled' },
    },
  });
  res.status(200).json({
    status: 'success',
    orders,
  });
});

const orderCompleted = catchAsync(async (req, res, next) => {
  const { order } = req;

  await order.update({ status: 'completed' });

  res.status(204).json({
    status: 'success',
  });
});

const orderCancelled = catchAsync(async (req, res, next) => {
  const { order } = req;

  await order.update({ status: 'cancelled' });

  res.status(204).json({
    status: 'success',
  });
});

module.exports = { createOrder, getOrderMe, orderCompleted, orderCancelled };
