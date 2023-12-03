'use strict';

const { Controller } = require('egg');
const dayjs = require('dayjs');

class UserController extends Controller {
  async index() {
    const { ctx } = this;
    await ctx.render('login.tpl');
  }

  // 註冊
  async register() {
    const { ctx } = this;
    const { userName, password } = ctx.request.body;

    if (!userName || !password) {
      ctx.status = 400;
      ctx.body = { message: '帳號密碼不能為空' };
    } else {
      const userInfo = await ctx.service.user.findUserByUserName(userName);

      if (userInfo && userInfo.userName) {
        ctx.status = 400;
        ctx.body = { message: '帳戶名已被註冊過' };
      } else {
        const result = await ctx.service.user.createUser({ userName, password });
        ctx.status = 302;
        ctx.body = { message: '註冊成功', user: result };
        ctx.redirect('/message');
      }
    }
  }

  async login() {
    const { ctx } = this;
    const { userName, password } = ctx.request.body;

    const userInfo = await ctx.service.user.findUserByUserName(userName);
    if (!userInfo || password !== userInfo.password) {
      ctx.status = 400;
      ctx.body = { message: '密碼錯誤' };
    } else {
      const userInfoarr = JSON.parse(JSON.stringify(userInfo));

      ctx.session.userInfo = userInfoarr;


      // const level = ctx.session.userInfo.userLevel;
      // console.log("level",level);
      ctx.redirect('/message');
      ctx.body = { message: '登入成功', userInfo };
    }
  }

  // 會員列表
  async list() {
    const { ctx } = this;

    // const level = ctx.session.userInfo.userLevel;
    // console.log("level", level);
    // console.log("session", ctx.session.userInfo);

    const level = 1;

    const levelText = {
      0: '一般會員',
      1: '管理員',
    };

    if (level === 1) {
      const members = await ctx.service.user.findAllUsers();
      const response = members.map(members => ({
        id: members.userID,
        naem: members.userName,
        time: dayjs(members.createdAt).format('YYYY/MM/DD'),
        level: levelText[members.userLevel],
      }));
      ctx.status = 200;
      await ctx.render('manger.tpl', { response });
    } else {
      // const userInfo = await ctx.service.user.findUser(userName);
      // console.log("userInfo",userInfo);
      // await ctx.render("member.tpl", { userInfo });
      ctx.status = 404;
      ctx.body = '沒有權限';
    }
  }

  async delete() {
    const { ctx } = this;
    const { id } = ctx.params;
    await ctx.service.user.deleteUser(id);

    ctx.status = 200;
    ctx.body = { message: '刪除成功' };
  }
}
module.exports = UserController;
