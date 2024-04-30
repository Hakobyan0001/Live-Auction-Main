const assignByProps = require("../utils/assignByProps");

/*
 * toDTO
 * Takes the data from the model as an argument and converts it into data transfer object
 * It helps to provide the users data in the same format and with the same properties and avoid providing kind of secret data and so on
 */

function toDTO(model) {
  return {
    id: model.id,
    email: model.email.toLowerCase(),
    createdAt: model.createdAt,
    updatedAt: model.updatedAt,
    role: model.role,
    firstName: model.firstName,
    lastName: model.lastName,
    active: model.active,
  };
}

/*
 * fromDTO
 * Takes the data transfer object as an argument and clears all unnecessary properties from that
 */

function fromDTO(dto, type) {
  const props = ["email", "role", "id", "firstName", "lastName", "active"];
  if (type === "create") {
    props.push("password");
  }
  return assignByProps(dto, props);
}

module.exports = {
  fromDTO,
  toDTO,
};
