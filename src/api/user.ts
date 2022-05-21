import { http } from "../utils/http";

interface userType extends Promise<any> {
  svg?: string;
  code?: number;
  info?: object;
}

// 获取验证码
export const getVerify = (): userType => {
  return http.request("get", "/captcha");
};

// 登录
export const getLogin = (data: object) => {
  return http.request("post", "/api/v1/user/login", { data });
};

// 刷新token
export const refreshToken = (data: object) => {
  return http.request("post", "/refreshToken", { data });
};

// 获取用户列表
export const getUserList = () => {
  return http.request("post", "/api/v1/user/get");
};

// 重置密码
export const resetPassword = (data: object) => {
  return http.request("post", "/api/v1/user/resetPassword", { data });
};

// 删除用户
export const deleteUser = (data: object) => {
  return http.request("post", "/api/v1/user/delete", { data });
};

// 添加用户
export const addUser = (data: object) => {
  return http.request("post", "/api/v1/user/add", { data });
};
