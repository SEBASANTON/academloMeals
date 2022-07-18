const { body, validationResult } = require('express-validator');

const { AppError } = require('../utils/appError');

const checkResult = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Array has errors
    const errorMsgs = errors.array().map(err => err.msg);

    const message = errorMsgs.join('. ');

    return next(new AppError(message, 400));
  }

  next();
};

const createUserValidators = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Must provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .isAlphanumeric()
    .withMessage('Password must contain letters and numbers'),
  checkResult,
];

const createRestaurantValidators = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('address').notEmpty().withMessage('Address cannot be empty'),
  body('rating')
    .notEmpty()
    .withMessage('Name cannot be empty')
    .isInt()
    .withMessage('Rating must be a integer value')
    .custom(val => val > 0)
    .withMessage(
      'The rating must be a number between 1 and 10, with 1 being the lowest rating and 10 being the highest.'
    )
    .custom(val => val <= 10)
    .withMessage(
      'The rating must be a number between 1 and 10, with 1 being the lowest rating and 10 being the highest.'
    ),
  checkResult,
];

const createMealValidators = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('price')
    .notEmpty()
    .withMessage('Name cannot be empty')
    .isInt()
    .withMessage('Price must be a integer value')
    .custom(val => val >= 0)
    .withMessage('Price cannot be a negative value'),
  checkResult,
];

const createOrderValidators = [
  body('quantity')
    .notEmpty()
    .withMessage('Quantity cannot be empty')
    .isInt()
    .withMessage('Quantity must be a integer value')
    .custom(val => val > 0)
    .withMessage('Quantity cannot be a negative value'),
  body('mealId')
    .notEmpty()
    .withMessage('MealId cannot be empty')
    .isInt()
    .withMessage('MealId must be a integer value')
    .custom(val => val > 0)
    .withMessage('MealId cannot be a negative value'),
  checkResult,
];

module.exports = {
  createUserValidators,
  createRestaurantValidators,
  createMealValidators,
  createOrderValidators,
};
