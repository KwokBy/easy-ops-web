import { http } from "../utils/http";

const BaseURL = "/api/v1/image";

// 获取镜像列表
export const getImages = (data: object) => {
  return http.request("post", BaseURL + "/get", { data });
};

// 添加镜像
export const addImage = (data: object) => {
  return http.request("post", BaseURL + "/add", { data });
};
