import base from "./BaseRESTService";

export const getItemsRequest = (params) => {
  return base.run("/items", {
    method: "GET",
    params,
  });
};
export const getItemRequest = (id) => {
  return base.run("/items/" + id, {
    method: "GET",
  });
};

export const addItemRequest = (data) => {
  return base.run("/items", {
    method: "POST",
    data,
  });
};

export const updateItemRequest = (data, id) => {
  return base.run("/items/" + id, {
    method: "PUT",
    data,
  });
};

export const deleteItemRequest = (id) => {
  return base.run("/items/" + id, {
    method: "DELETE",
  });
};
