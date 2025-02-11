import sequelize from '../config/connection.js';
import { UserFactory } from './user.js';
import { DishFactory } from './dish.js';

const User = UserFactory(sequelize);
const Dish = DishFactory(sequelize);

User.hasMany(Dish, {
    onDelete: 'CASCADE',
    as: 'dishes',
    foreignKey: 'userId',
});

// A book can only have one author
Dish.belongsTo(User, {foreignKey: 'userId'});

export { User, Dish };
