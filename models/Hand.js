const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connections');

class Hand extends Model {}

Hand.init(
    {
        hand_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        hand_val: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            reference: {
                model: 'user',
                key: 'user_id',
            },
        },

    },
    {
        sequelize,
        freezeTableName: true,
        undersscored: true,
        modelName: 'hand',
    }
);

module.exports = Hand;