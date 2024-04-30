import base from "./BaseRESTService";

export const addBidRequest = (data) => {
  return base.run("/bid", {
    method: "POST",
    data,
  });
};

export const updateBidRequest = (data, id) => {
  return base.run("/bid/" + id, {
    method: "PUT",
    data,
  });
};
