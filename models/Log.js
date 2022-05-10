const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connections');

class Log extends Model {}

Log.init(
    {
        id: {
            type:DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
        },
        round: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
        },
        hand_id: {
            type: DataTypes.INTEGER,
            reference: {
                model: 'hand',
                key: 'hand_id',
            },
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

module.exports = Log;