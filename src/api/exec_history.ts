import { http } from "../utils/http";

const BaseURL = "/api/v1/execHistory";

// 获取执行历史列表
export const getExecHistories = (data: object) => {
  return http.request("post", BaseURL + "/get", { data });
};
