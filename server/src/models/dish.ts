import { Model, DataTypes, Sequelize, ForeignKey } from 'sequelize';
import { User } from './user.js'; // Adjust the import path as necessary

class Dish extends Model {
    declare id: number;
    declare userId: ForeignKey<User['id']>;
    declare recipe: string;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

export function DishFactory(sequelize: Sequelize): typeof Dish {
    Dish.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'users', // Name of the target model
                    key: 'id', // Key in the target model that the foreign key references
                },
            },
            recipe: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            tableName: 'dishes',
            sequelize,
            timestamps: true, // Ensure timestamps are enabled
        }
    );
    return Dish;
}
