const express = require('express');

//Controllers
const {
  createOrder,
  getOrderMe,
  orderCompleted,
  orderCancelled,
} = require('../controllers/orders.controller');

//Middlewares
const { orderExists } = require('../middlewares/orders.middleware');
const {
  protectSesssion,
  protectOrder,
} = require('../middlewares/auth.middleware');

const {
  createOrderValidators,
} = require('../middlewares/validators.middleware');

const router = express.Router();

router.use(protectSesssion);

router.post('/', createOrderValidators, createOrder);

router.get('/me', getOrderMe);

router
  .use('/:id', orderExists, protectOrder)
  .route('/:id')
  .patch(orderCompleted)
  .delete(orderCancelled);

module.exports = { ordersRouter: router };
