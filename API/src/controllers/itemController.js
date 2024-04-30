const Sequelize = require("sequelize");
const setStatus = require("../utils/setStatus.js");
const statusCodes = require("../config/statusCodes.js");
const ItemsService = require("../services/ItemsService.js");
const itemDecorators = require("../mappers/itemDecorators.js");
const paginationMapper = require("../mappers/pagination.js");
const mapper = require("../mappers/items.js");

const Op = Sequelize.Op;
const itemsService = new ItemsService();

/*
 * Items CRUD
 */

exports.getItems = async function (req, res) {
  const reqQuery = req.query;
  const paginationParams = paginationMapper.fromDTO(reqQuery);

  try {
    const result = await itemDecorators.getList(itemsService, mapper, {
      reqQuery,
      paginationParams,
    });
    setStatus(res, false, { data: result });
  } catch (err) {
    setStatus(res, true, {
      status: statusCodes.ServerError,
      message: "Error with server.",
    });
  }
};
exports.getItem = async function (req, res) {
  const itemId = req.params.id;

  if (!itemId) {
    return setStatus(res, true, {
      status: statusCodes.BadRequestError,
      message: "Bad Request. Item ID is required.",
    });
  }

  try {
    const item = await itemsService.getItemById(itemId);
    if (!item) {
      return setStatus(res, true, {
        status: statusCodes.NotFoundError,
        message: "Item not found.",
      });
    }
    setStatus(res, false, { data: item });
  } catch (err) {
    setStatus(res, true, {
      status: statusCodes.ServerError,
      message: "Error with server.",
    });
  }
};
exports.createItem = async function (req, res) {
  const { name, description, currentBid, imageUrl, startDate, endDate } =
    req.body;
  const id = req.user.id;

  if (!name) {
    return setStatus(res, true, {
      status: statusCodes.BadRequestError,
      message: "Bad Request. Item Name is required.",
    });
  }
  if (!description) {
    return setStatus(res, true, {
      status: statusCodes.BadRequestError,
      message: "Bad Request. Description is required.",
    });
  }
  if (!currentBid) {
    return setStatus(res, true, {
      status: statusCodes.BadRequestError,
      message: "Bad Request. Current Bid is required.",
    });
  }
  if (!imageUrl) {
    return setStatus(res, true, {
      status: statusCodes.BadRequestError,
      message: "Bad Request. Item Image is required.",
    });
  }
  if (!startDate) {
    return setStatus(res, true, {
      status: statusCodes.BadRequestError,
      message: "Bad Request. Start Date is required.",
    });
  }
  if (!endDate) {
    return setStatus(res, true, {
      status: statusCodes.BadRequestError,
      message: "Bad Request. End Date is required.",
    });
  }

  const data = { ...req.body, userId: id };
  try {
    const createdItem = await itemDecorators.create(itemsService, mapper, data);
    const result = await itemDecorators.getById(
      itemsService,
      mapper,
      createdItem.id
    );
    setStatus(res, false, { data: result });
  } catch (err) {
    setStatus(res, true, {
      status: statusCodes.ServerError,
      message: "Error with server.",
    });
  }
};

exports.updateItem = async function (req, res) {
  const id = req.params.id;
  const { name, description, currentBid, imageUrl, startDate, endDate } =
    req.body;

  if (!name) {
    return setStatus(res, true, {
      status: statusCodes.BadRequestError,
      message: "Bad Request. Item Name is required.",
    });
  }
  if (!description) {
    return setStatus(res, true, {
      status: statusCodes.BadRequestError,
      message: "Bad Request. Description is required.",
    });
  }
  if (!currentBid) {
    return setStatus(res, true, {
      status: statusCodes.BadRequestError,
      message: "Bad Request. Current Bid is required.",
    });
  }
  if (!imageUrl) {
    return setStatus(res, true, {
      status: statusCodes.BadRequestError,
      message: "Bad Request. Item Image is required.",
    });
  }
  if (!startDate) {
    return setStatus(res, true, {
      status: statusCodes.BadRequestError,
      message: "Bad Request. Start Date is required.",
    });
  }
  if (!endDate) {
    return setStatus(res, true, {
      status: statusCodes.BadRequestError,
      message: "Bad Request. End Date is required.",
    });
  }
  const rowData = { ...req.body };

  try {
    const result = await itemDecorators.update(
      ItemsService,
      mapper,
      id,
      rowData
    );
    const item = await itemDecorators.getById(ItemsService, mapper, result.id);
    setStatus(res, false, { data: item });
  } catch (err) {
    setStatus(res, true, {
      status: statusCodes.ServerError,
      message: "Error with server.",
    });
  }
};

exports.deleteItem = async function (req, res) {
  const id = req.params.id;

  if (!id) {
    return setStatus(res, true, {
      status: statusCodes.BadRequestError,
      message: "Bad Request. Item is not selected.",
    });
  }
  try {
    const result = await itemsService.delete(id);
    setStatus(res, false, { data: result });
  } catch (err) {
    setStatus(res, true, {
      status: statusCodes.ServerError,
      message: "Error with server.",
    });
  }
};
