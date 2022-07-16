const express = require('express');

//Controllers
const {
  getAllUsers,
  createUser,
  login,
  updateUser,
  deleteUser,
  getOrder,
  getOrderById,
} = require('../controllers/users.controller');

//Middlewares
const { userExists } = require('../middlewares/users.middleware');
const {
  createUserValidators,
} = require('../middlewares/validators.middleware');
const {
  protectSesssion,
  protectUser,
} = require('../middlewares/auth.middleware');

const router = express.Router();


router.post('/signup', createUserValidators, createUser);

router.post('/login', login);

router.use(protectSesssion);

router.get('/', getAllUsers);

router
  .use('/:id', userExists)
  .route('/:id')
  .patch(protectUser, updateUser)
  .delete(protectUser, deleteUser);

router.get('/orders', getOrder);


router.get('/orders/:id', getOrderById);

module.exports = { usersRouter: router };
