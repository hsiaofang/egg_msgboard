'use strict';

module.exports = (app) => {
    const { STRING, INTEGER, DATE } = app.Sequelize;

    const User = app.model.define('user', {
        userID: { type: INTEGER, primaryKey: true, autoIncrement: true },
        userName: { type: STRING(128), allowNull: false },
        password: { type: STRING(64), allowNull: false },
        createdAt: DATE,
        updatedAt: DATE,
        userLevel: { type: INTEGER, allowNull: false, defaultValue: 0, //默認值
    },
    }, {
        // 禁止資料表加上複數(s)
        freezeTableName: true,
        // timestamps: false, //停用createAt，updateAt

    });

    return User;
}