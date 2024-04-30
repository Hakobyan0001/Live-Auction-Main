const { map } = require("lodash");

/*
 * This class some kind of implementation of adapter design pattern but instead
 * using inheritance it's is using composition to provide better flexibility. Main purpose
 * of this class to reduce redundant code in controllers related with dto to model and model to
 * dto conversation.
 */

module.exports.getById = async function (item, mapper, id) {
  const model = await item.getById(id);
  return model && mapper.toDTO(model);
};

module.exports.getBy = async function (item, mapper, ...args) {
  const model = await item.getBy(...args);
  return model && mapper.toDTO(model);
};

module.exports.getList = async function (item, mapper, ...args) {
  const data = await item.getList(...args);
  data.rows = map(data.rows, (item) => mapper.toDTO(item));
  return data;
};

module.exports.create = async function (item, mapper, ...args) {
  const dataFromDTO = mapper.fromDTO(...args, "create");
  const model = await item.create(dataFromDTO);
  return mapper.toDTO(model);
};

module.exports.update = async function (item, mapper, id, data) {
  const dataFromDTO = mapper.fromDTO(data);
  const model = await item.update(id, dataFromDTO, { new: true });
  return mapper.toDTO(model);
};

module.exports.delete = function (item, mapper, id) {
  return item.delete(id);
};
