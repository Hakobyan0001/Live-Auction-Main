import base from "./BaseRESTService";

export const registerRequest = (data) => {
  return base.run('/auth/register', {
    method: 'POST',
    data
  });
};
