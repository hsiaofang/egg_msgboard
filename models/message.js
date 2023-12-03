'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const Message = app.model.define(
    'message',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      userID: INTEGER,
      title: STRING(64),
      content: TEXT,
      createdAt: DATE,
      updatedAt: DATE,
    },
    {
      freezeTableName: true, // 禁止資料表加上複數(s)
      timestamps: true, // 停用createAt，updateAt
    }
  );
  true;

  //   Message.associate = () => {app
  //     foreignKey: 'userid'
  //   }

  // 設定message資料表userid為外鍵
  Message.associate = function() {
    app.model.Message.belongsTo(app.model.User, { foreignKey: 'userID' });
  };


  return Message;
};
