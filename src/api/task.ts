import { http } from "../utils/http";

const BaseURL = "/api/v1/task";

// 获取任务列表
export const getTasks = (data: object) => {
  return http.request("post", BaseURL + "/get", { data });
};

// 添加任务
export const addTask = (data: object) => {
  return http.request("post", BaseURL + "/add", { data });
};

// 执行任务
export const execTask = (data: object) => {
  return http.request("post", BaseURL + "/exec", { data });
};

// 停止任务
export const stopTask = (data: object) => {
  return http.request("post", BaseURL + "/stop", { data });
};

// 增加并执行任务
export const addAndRun = (data: object) => {
  return http.request("post", BaseURL + "/addAndRun", { data });
};
