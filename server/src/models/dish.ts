import { DataTypes, type Sequelize, Model, ForeignKey type Optional } from 'sequelize';
import type { User } from './user.js';

interface DishAttributes {
    id: number;
    dishName: string;
}

interface DishCreationAttributes extends Optional<DishAttributes, 'id'> { }

export class Dish
    extends Model<DishAttributes, DishCreationAttributes>
    implements DishAttributes {
    public id!: number;
    declare userId: ForeignKey<User['id']>;
    public dishName!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export function DishFactory(sequelize: Sequelize): typeof Dish {
    Dish.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            dishName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            tableName: 'dishes',
            sequelize
        }
    )
    return Dish;
}
