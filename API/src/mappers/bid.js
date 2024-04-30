const assignByProps = require("../utils/assignByProps");

/*
 * toDTO
 * Takes the data from the model as an argument and converts it into data transfer object
 * It helps to provide the users data in the same format and with the same properties and avoid providing kind of secret data and so on
 */

function toDTO(model) {
  const record = has(model, "record") ? model.record : model;
  return {
    itemId: record.itemId,
    userId: record.userId,
    bidAmount: record.bidAmount,
    isWin: record.isWin,
  };
}

/*
 * fromDTO
 * Takes the data transfer object as an argument and clears all unnecessary properties from that
 */

function fromDTO(dto) {
  const props = ["bidAmount", "itemId", "userId"];
  return assignByProps(dto, props);
}

module.exports = {
  fromDTO,
  toDTO,
};
