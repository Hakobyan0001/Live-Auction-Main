const BaseService = require("./BaseService");
const Bid = require("../models/BidModel");
const Sequelize = require("sequelize");

const Op = Sequelize.Op;

class BidsService extends BaseService {
  constructor() {
    super(Bid);
  }

  async getBidById(id) {
    return super.getById(id);
  }

  async create(data) {
    const bid = await super.create(data);
    bid.setUser(data.userId);
    await bid.save();
    return bid;
  }

  async update(id, data) {
    const bid = await super.update(id, data);
    return bid;
  }
}

module.exports = BidsService;
