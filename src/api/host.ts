import { http } from "../utils/http";

const BaseURL = "/api/v1/host";

// 获取主机列表
export const getHosts = (data: object) => {
  return http.request("post", BaseURL + "/get", { data });
};

// 添加主机
export const addHost = (data: object) => {
  return http.request("post", BaseURL + "/add", { data });
};

// 删除主机
export const delHost = (data: object) => {
  return http.request("post", BaseURL + "/delete", { data });
};

// 更新主机
export const updateHost = (data: object) => {
  return http.request("post", BaseURL + "/update", { data });
};

// 验证主机
export const verifyHost = (data: object) => {
  return http.request("post", BaseURL + "/verify", { data });
};
