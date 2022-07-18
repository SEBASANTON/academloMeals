const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

//Models
const { User } = require('../models/user.model');

//Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

dotenv.config({ path: './config.env' });

const protectSesssion = catchAsync(async (req, res, next) => {
  let token;

  //Extract the token from headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('Invalid token', 403));
  }

  //Ask JWT (library), if the token is still valid
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  //Check in db that user still exists
  const user = await User.findOne({
    where: { id: decoded.id, status: 'active' },
  });

  if (!user) {
    return next(
      new AppError('The owner of this token doesnt exist anymore', 403)
    );
  }

  //Grant access
  req.sessionUser = user;
  next();
});

const protectUser = catchAsync(async (req, res, next) => {
  const { sessionUser, user } = req;

  if (sessionUser.id !== user.id) {
    return next(new AppError('You do not own this account', 403));
  }

  next();
});

const protectReview = catchAsync(async (req, res, next) => {
  const { sessionUser, review } = req;

  if (sessionUser.id !== review.userId) {
    return next(new AppError('You do not own this review', 403));
  }

  next();
});

const protectAdmin = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  if (sessionUser.role !== 'admin') {
    return next(new AppError('You are not admin', 403));
  }
  next();
});

const protectOrder = catchAsync(async (req, res, next) => {
  const { sessionUser, order } = req;

  if (sessionUser.id !== order.userId) {
    return next(new AppError('You do not own this account', 403));
  }

  next();
});

module.exports = {
  protectSesssion,
  protectUser,
  protectReview,
  protectAdmin,
  protectOrder,
};
