const { isEmpty } = require("lodash");

class BaseService {
  constructor(Model) {
    this.Model = Model;
  }

  getById(id) {
    return this.Model.findByPk(id);
  }

  async getBy(params) {
    const model = await this.Model.findAll(params);

    if (!model || isEmpty(model[0])) {
      return null;
    }
    return model[0];
  }

  create(data) {
    return this.Model.create(data);
  }

  async update(id, data) {
    const model = await this.Model.findByPk(id);
    return model.update(data);
  }

  async delete(id) {
    const instance = await this.getById(id);
    if (!instance) {
      return false;
    }
    await instance.destroy();
    return instance;
  }

  async getList({ filters = {}, sortOrder, limit, offset, include, useFind }) {
    const params = {
      attributes: filters.attributes,
      where: { ...filters.where },
      limit,
      offset,
      order: [...(sortOrder || []), ["currentBid", "DESC"]],
    };

    if (filters.having) {
      params.having = filters.having;
    }

    if (filters.group) {
      params.group = filters.group;
    }

    if (include) {
      params.include = [...include];
      params.distinct = true;
    }
    const list = useFind
      ? await this.Model.findAll(params)
      : await this.Model.findAndCountAll(params);
    if (!list) {
      return null;
    }
    return list;
  }
}

module.exports = BaseService;
