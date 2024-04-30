const BaseService = require("./BaseService");
const User = require("../models/UserModel");
const { isValidEmail } = require("../utils/validators");
const Sequelize = require("sequelize");

const Op = Sequelize.Op;

class UsersService extends BaseService {
  constructor() {
    super(User);
  }

  async getList({ reqQuery, paginationParams }) {
    let where = {
      active: true,
    };
    if (reqQuery.role) {
      where.role = reqQuery.role;
    }
    if (reqQuery.search) {
      const like = `%${reqQuery.search}%`;
      where = {
        [Op.or]: [
          { firstName: { [Op.like]: like } },
          { lastName: { [Op.like]: like } },
          { role: { [Op.like]: like } },
          { email: { [Op.like]: like } },
        ],
      };
    }
    let filters = { where };
    const users = await super.getList({ filters, ...paginationParams });
    return users;
  }

  async create(data) {
    const email = data.email.toLowerCase();
    const user = await this.getBy({ where: { email } }, false);
    if (user) {
      throw new Error("User with such email exist.");
    }
    return super.create(data);
  }

  async isInvalidEmail(email) {
    if (!isValidEmail(email)) {
      return { message: "Invalid email", error: true };
    }
    const user = await this.getBy({ where: { email } }, false);
    if (user) {
      return { message: "Email already taken", error: true };
    }

    return false;
  }
}

module.exports = UsersService;
