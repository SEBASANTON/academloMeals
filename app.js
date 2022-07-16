const express = require('express');
const cors = require('cors');

//Controllers
const { globalErrorHandler } = require('./controllers/errors.controller');

//Routers
const { usersRouter } = require('./routes/users.routes');
const { restaurantsRouter } = require('./routes/restaurants.routes');
const { mealsRouter } = require('./routes/meals.routes');
const { ordersRouter } = require('./routes/orders.routes');

const app = express();

app.use(cors());

//Enable incoming JSON data
app.use(express.json());

//Endpoints
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/restaurants', restaurantsRouter);
app.use('/api/v1/meals', mealsRouter);
app.use('/api/v1/orders', ordersRouter);

app.use(globalErrorHandler);

module.exports = { app };
