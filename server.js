const { app } = require('./app');

//Models
const { User } = require('./models/user.model');
const { Restaurant } = require('./models/restaurant.model');
const { Meal } = require('./models/meal.model');
const { Order } = require('./models/order.model');
const { Review } = require('./models/review.model');

//Utils
const { db } = require('./utils/database');

//Database authenticated
db.authenticate()
  .then(() => console.log('Database authenticated'))
  .catch(err => console.log(err));

//Init models relations
Restaurant.hasMany(Meal, { foreignKey: 'restaurantId' });
Meal.belongsTo(Restaurant);

Restaurant.hasMany(Review, { foreignKey: 'restaurantId' });
Review.belongsTo(Restaurant);

Meal.hasOne(Order, { foreignKey: 'mealId' });
Order.belongsTo(Meal);

User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User);

User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User);

//Database synced with models' relations
db.sync(/* { force: true } */)
  .then(() => console.log('Database synced'))
  .catch(err => console.log(err));

//Spin up server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Express app running on port: ${PORT}`);
});
