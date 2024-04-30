const Sequelize = require("sequelize");
const setStatus = require("../utils/setStatus.js");
const statusCodes = require("../config/statusCodes.js");
const BidsService = require("../services/BidsService.js");
const bidDecorators = require("../mappers/bidDecorators.js");
const paginationMapper = require("../mappers/pagination.js");
const mapper = require("../mappers/bid.js");

const Op = Sequelize.Op;
const bidsService = new BidsService();

/*
 * Items CRUD
 */

exports.createBid = async function (req, res) {
  const { bidAmount } = req.body;
  const id = req.user.id;

  if (!bidAmount) {
    return setStatus(res, true, {
      status: statusCodes.BadRequestError,
      message: "Bad Request. Bid Amount is required.",
    });
  }

  const data = { ...req.body, userId: id };
  try {
    const createdBid = await bidDecorators.create(bidsService, mapper, data);
    const result = await bidDecorators.getById(
      bidsService,
      mapper,
      createdBid.id
    );
    setStatus(res, false, { data: result });
  } catch (err) {
    setStatus(res, true, {
      status: statusCodes.ServerError,
      message: "Error with server.",
    });
  }
};

exports.updateBid = async function (req, res) {
  const { bidAmount } = req.body;
  const id = req.user.id;

  if (!bidAmount) {
    return setStatus(res, true, {
      status: statusCodes.BadRequestError,
      message: "Bad Request. Bid Amount is required.",
    });
  }

  const rowData = { ...req.body };

  try {
    const result = await bidDecorators.update(bidsService, mapper, id, rowData);
    const bid = await bidDecorators.getById(bidsService, mapper, result.id);
    setStatus(res, false, { data: bid });
  } catch (err) {
    setStatus(res, true, {
      status: statusCodes.ServerError,
      message: "Error with server.",
    });
  }
};
