'use strict';

const { Controller } = require('egg');
const message = require('../model/message');

class MessageController extends Controller {

  async index() {
    const { ctx, service } = this;
    const message = await service.message.getAllMessage();

    const response = message.map(message => ({
      time: message.createdAt,
      name: message.userID,
      title: message.title,
      content: message.content,
      id: message.id,
    }));
    await ctx.render('message.tpl', { response });
  }


  async createMessage() {
    const { ctx, service } = this;
    const { title, content } = ctx.request.body;
    // const userID = ctx.session.userInfo.userID;
    const userID = 198;

    const messageID = await ctx.app.redis.incr('message_id_counter');
    const currentTime = new Date();
    const message = {
      userID,
      title,
      content,
      createdAt: currentTime,
    };

    const field = `message:${messageID}`; // ``是模板字符串，可以更方便地嵌入變量值。'user:' + userID;為普通字符串連接，冗長且不清晰。
    const redisValue = JSON.stringify(message);

    const resultId = await ctx.app.redis.hset('messages', field, redisValue);
    ctx.status = 200;
    ctx.body = { message: '新增成功', resultId };
  }


  async deleteMessage() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    await service.message.deleteMessage(id);
    ctx.status = 200;
    ctx.body = { message: '刪除成功' };
  }

  async getMessage() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const message = await service.message.getMessageById(id);
    const content = message.content;

    ctx.status = 200;
    ctx.body = { content };
  }

  async editMessage() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const { content } = ctx.request.body;
    await service.message.editMessage(id, content);

    ctx.status = 200;
    ctx.body = { message: ' 修改成功' };
  }

}

module.exports = MessageController;

