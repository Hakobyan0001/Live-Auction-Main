const setStatus = require("../utils/setStatus");
const serviceDecorators = require("../mappers/itemDecorators.js");
const UsersService = require("../services/UsersService");
const mapper = require("../mappers/user");
const generateToken = require("../utils/generateToken");
const statusCodes = require("../config/statusCodes");

const userService = new UsersService();

/*
 * Auth CRUD
 */

exports.login = async (req, res) => {
  const user = mapper.toDTO(req.user);
  const token = generateToken(user);
  res.json({ token, user });
};

exports.register = async (req, res) => {
  const { email, password, firstName, lastName, role } = req.body;
  if (!role) {
    return setStatus(res, true, {
      status: statusCodes.BadRequestError,
      message: "Bad Request. User role is required.",
    });
  }
  if (!["customer", "specialist"].includes(role)) {
    return setStatus(res, true, {
      status: statusCodes.BadRequestError,
      message:
        "Bad Request. The user role should be either customer or specialist.",
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
  if (password.length < 6) {
    return setStatus(res, true, {
      status: statusCodes.BadRequestError,
      message: "Bad Request. Password should be not less then 6 characters.",
    });
  }

  try {
    const userData = { ...req.body };

    const validationError = await userService.isInvalidEmail(email);
    if (validationError) {
      setStatus(res, true, {
        status: 400,
        success: true,
        message: validationError.message,
      });
      return;
    }

    await serviceDecorators.create(userService, mapper, userData);
    setStatus(res, false, {
      success: true,
      message: "Your account created, Please login",
    });
  } catch (err) {
    setStatus(res, true, {
      status: statusCodes.ServerError,
      message: "Server error",
    });
  }
};
