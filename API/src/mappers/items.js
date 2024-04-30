const assignByProps = require("../utils/assignByProps");
const { has } = require("lodash");

/*
 * toDTO
 * Takes the data from the model as an argument and converts it into data transfer object
 * It helps to provide the services data in the same format and with the same properties and avoid providing kind of secret data and so on
 */

function toDTO(model) {
  const record = has(model, "record") ? model.record : model;
  return {
    id: record.id,
    name: record.name,
    description: record.description,
    currentBid: record.currentBid,
    startDate: record.startDate,
    endDate: record.endDate,
    imageUrl: record.imageUrl,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
    userId: record.userId,
  };
}

/*
 * fromDTO
 * Takes the data transfer object as an argument and clears all unnecessary properties from that
 */

function fromDTO(dto) {
  const props = [
    "name",
    "description",
    "currentBid",
    "startDate",
    "endDate",
    "imageUrl",
    "userId",
  ];
  return assignByProps(dto, props);
}

module.exports = {
  fromDTO,
  toDTO,
};
