import { http } from "../utils/http";

const BaseURL = "/api/v1/execHistoryInfo";

// 获取执行历史列表
export const getExecHistoryInfos = (data: object) => {
  return http.request("post", BaseURL + "/get", { data });
};
