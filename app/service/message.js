const Service = require('egg').Service;
// const MessageModel = require('/Applications/XAMPP/xamppfiles/htdocs/msgboard/test/app/mock/MockMessageModel.js'); // 引入您的模擬 MessageModel

// const MockMessageModel = require('../../test/app/mock/MockMessageModel');


class MessageService extends Service {

  async getAllMessage() {
    const message = await this.ctx.model.Message.findAll({
      // 與限定查詢字段
      attributes: [ 'id', 'createdAt', 'userID', 'title', 'content' ],
    });
    return message;
  }

  async createMessage(userID, title, content) {
    const { ctx, app } = this;
    const newMessage = await this.ctx.model.Message.create({
      userID,
      title,
      content,
    });

    return newMessage.id;
  }

  async deleteMessage(id) {
    const { app } = this;
    const message = await app.model.Message.findByPk(id);
    if (message) {
      await message.destroy();
    }
  }

  async getMessageById(id) {
    const message = await this.ctx.model.Message.findByPk(id, {
      attributes: [ 'content' ],
    });

    return message;
  }

  async editMessage(id, content) {
    const { ctx } = this;
    const message = await this.ctx.model.Message.findByPk(id);

    if (message) {
      message.content = content;
      await message.save();
    }
  }

}


module.exports = MessageService;

