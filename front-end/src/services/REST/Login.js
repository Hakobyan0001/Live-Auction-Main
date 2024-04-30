import base from "./BaseRESTService";

export const loginRequest = (data) => {
  return base.run('/auth/login', {
    method: 'POST',
    data
  });
};
