const { User } = require('../models/user.model');

const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const userExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({ where: { id, status: 'active' } });

  if (!user) {
    return next(
      new AppError('User does not exist with given Id or is disabled', 404)
    );
  }

  req.user = user;
  next();
});

module.exports = { userExists };
