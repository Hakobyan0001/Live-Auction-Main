const Sequelize = require("sequelize");
const setStatus = require("../utils/setStatus");
const statusCodes = require("../config/statusCodes");
const UsersService = require("../services/UsersService");
const itemDecorators = require("../mappers/itemDecorators.js");
const paginationMapper = require("../mappers/pagination");
const mapper = require("../mappers/user");

const Op = Sequelize.Op;
const usersService = new UsersService();

/*
 * Users CRUD
 */

exports.getUsers = async function (req, res) {
  const reqQuery = req.query;
  const paginationParams = paginationMapper.fromDTO(reqQuery);

  try {
    const result = await itemDecorators.getList(usersService, mapper, {
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

exports.getUser = async function (req, res) {
  const id = req.params.id;

  if (!id) {
    return setStatus(res, true, {
      status: statusCodes.BadRequestError,
      message: "Bad Request. User is not selected",
    });
  }
  try {
    const result = await itemDecorators.getById(usersService, mapper, id);
    if (!result) {
      setStatus(res, true, {
        status: statusCodes.NotFoundStatus,
        message: "User not found.",
      });
      return;
    }
    setStatus(res, false, { data: result });
  } catch (err) {
    setStatus(res, true, {
      status: statusCodes.ServerError,
      message: "Server error.",
    });
  }
};

exports.createUser = async function (req, res) {
  const { email, role, firstName, lastName, password } = req.body;
  if (!role) {
    return setStatus(res, true, {
      status: statusCodes.BadRequestError,
      message: "Bad Request. User role is required.",
    });
  }
  if (!firstName) {
    return setStatus(res, true, {
      status: statusCodes.BadRequestError,
      message: "Bad Request. First name is required.",
    });
  }
  if (!lastName) {
    return setStatus(res, true, {
      status: statusCodes.BadRequestError,
      message: "Bad Request. Last name is required.",
    });
  }
  if (!email) {
    return setStatus(res, true, {
      status: statusCodes.BadRequestError,
      message: "Bad Request. Email is required.",
    });
  }
  if (!password) {
    return setStatus(res, true, {
      status: statusCodes.BadRequestError,
      message: "Bad Request. Password is required.",
    });
  }
  if (password.length < 5) {
    return setStatus(res, true, {
      status: statusCodes.BadRequestError,
      message: "Bad Request. Password should be not less then 4 characters.",
    });
  }

  try {
    const createdServiceType = await itemDecorators.create(
      usersService,
      mapper,
      req.body
    );
    setStatus(res, false, { data: createdServiceType });
  } catch (err) {
    setStatus(res, true, {
      status: statusCodes.ServerError,
      message: "Error with server.",
    });
  }
};

exports.updateUser = async function (req, res) {
  const id = req.params.id;

  if (!id) {
    return setStatus(res, true, {
      status: statusCodes.BadRequestError,
      message: "Bad Request. User is not selected.",
    });
  }

  const data = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  };

  try {
    const result = await itemDecorators.update(usersService, mapper, id, data);
    setStatus(res, false, { data: result });
  } catch (err) {
    setStatus(res, true, {
      status: statusCodes.ServerError,
      message: "Error with server.",
    });
  }
};

exports.deleteUser = async function (req, res) {
  const id = req.params.id;

  if (!id) {
    return setStatus(res, true, {
      status: statusCodes.BadRequestError,
      message: "Bad Request. User is not selected.",
    });
  }
  try {
    const result = await itemDecorators.update(usersService, mapper, id, {
      active: false,
    });
    setStatus(res, false, { data: result });
  } catch (err) {
    setStatus(res, true, {
      status: statusCodes.ServerError,
      message: "Error with server.",
    });
  }
};
