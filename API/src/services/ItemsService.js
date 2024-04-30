const BaseService = require("./BaseService");
const Item = require("../models/ItemModel");
const Sequelize = require("sequelize");

const Op = Sequelize.Op;

class ItemsService extends BaseService {
  constructor() {
    super(Item);
  }

  async getList({ user, reqQuery, paginationParams }) {
    let where = {
      "$User.active$": true,
    };
    let attributes, having, sortOrder;

    attributes = [
      "id",
      "name",
      "description",
      "currentBid",
      "startDate",
      "endDate",
      "imageUrl",
      "updatedAt",
      "userId",
    ];

    if (reqQuery.id) {
      where.userId = reqQuery.id;
    }
    if (reqQuery.searchedText) {
      where[Op.or] = [
        { name: { [Op.like]: `%${reqQuery.searchedText}%` } },
        { description: { [Op.like]: `%${reqQuery.searchedText}%` } },
      ];
    }
    const from = reqQuery.from ? Number(reqQuery.from) : 0;
    if (reqQuery.to) {
      where.currentBid = { [Op.between]: [from, reqQuery.to] };
    } else {
      where.currentBid = { [Op.gte]: from };
    }
    if (reqQuery.sortOrder) {
      sortOrder = [["currentBid", reqQuery.sortOrder]];
    }
    let filters = { where, attributes, having };

    const items = await super.getList({
      filters,
      sortOrder,
      ...paginationParams,
      useFind: true,
    });

    const itemsCount = await this.Model.count({
      where,
    });
    if (!items) {
      return null;
    }
    return { count: itemsCount, rows: items };
  }

  async getItemById(id) {
    return super.getById(id);
  }

  async create(data) {
    const item = await super.create(data);
    item.setUser(data.userId);
    await item.save();
    return item;
  }

  async update(id, data) {
    const item = await super.update(id, data);
    return item;
  }
}

module.exports = ItemsService;
