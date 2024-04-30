const { map } = require("lodash");

/*
 * This class some kind of implementation of adapter design pattern but instead
 * using inheritance it's is using composition to provide better flexibility. Main purpose
 * of this class to reduce redundant code in controllers related with dto to model and model to
 * dto conversation.
 */

module.exports.getById = async function (bid, mapper, id) {
  const model = await bid.getById(id);
  return model && mapper.toDTO(model);
};

module.exports.create = async function (bid, mapper, ...args) {
  const dataFromDTO = mapper.fromDTO(...args, "create");
  const model = await bid.create(dataFromDTO);
  return mapper.toDTO(model);
};

module.exports.update = async function (bid, mapper, id, data) {
  const dataFromDTO = mapper.fromDTO(data);
  const model = await bid.update(id, dataFromDTO, { new: true });
  return mapper.toDTO(model);
};
