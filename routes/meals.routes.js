const express = require('express');

//Controllers
const {
  getAllMeals,
  getMealById,
  createMeal,
  updateMeal,
  deleteMeal,
} = require('../controllers/meals.controller');

//Middlewares
const { mealExists } = require('../middlewares/meals.middleware');
const { restaurantExists } = require('../middlewares/restaurants.middleware');
const {
  protectSesssion,
  protectAdmin,
} = require('../middlewares/auth.middleware');
const {
  createMealValidators,
} = require('../middlewares/validators.middleware');

const router = express.Router();

router.get('/', getAllMeals);
router.get('/:id', mealExists, getMealById);

router.use(protectSesssion);

router.post('/:id', createMealValidators, restaurantExists, createMeal);

router
  .use('/:id', mealExists, protectAdmin)
  .route('/:id')
  .patch(updateMeal)
  .delete(deleteMeal);

module.exports = { mealsRouter: router };
