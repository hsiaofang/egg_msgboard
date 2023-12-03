const Service = require('egg').Service;

class UserService extends Service {
  constructor(ctx) {
    super(ctx);
    this.UserModel = ctx.model.UserModel; 
  }

  async findUserByUserName(userName) {
    const { ctx } = this;    
    const userInfo = await ctx.model.User.findOne({ where: { userName } });
    return userInfo;
  }

  async createUser({ userName, password }) {
    const { ctx } = this;
    const result = await ctx.model.User.create({ userName, password });
    return result;
  }
 
  async findAllUsers() {
    const result = await this.ctx.model.User.findAll();
    return result;
  }

  async deleteUser(id) {
    const model = this.UserModel(this.ctx.sequelize); 
    const t = await this.ctx.model.transaction();
    try {
      await this.ctx.model.Message.destroy({ where: { userID: id }, transaction: t });
      await this.ctx.model.User.destroy({ where: { userID: id }, transaction: t });
      await t.commit();
      return true;
    } catch (err) {
      await t.rollback();
    }
  }
}

module.exports = UserService;
