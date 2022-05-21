import { http } from "../utils/http";

const BaseURL = "/api/v1/role";

export const getRoles = () => {
  return http.request("post", BaseURL + "/get");
};

export const addRole = (data: object) => {
  return http.request("post", BaseURL + "/add", { data });
};

export const getApi = () => {
  return http.request("post", BaseURL + "/getApi");
};

export const getPermission = (data: object) => {
  return http.request("post", BaseURL + "/permissions", { data });
};
