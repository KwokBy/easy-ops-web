export interface Role {
  id: number;
  role_id: number;
  name_zh: string;
  desc?: string;
}

export interface User {
  id: number;
  username: string;
  nickname: string;
  avatar?: string;
  last_ip?: string;
  role_id: number;
  password?: string;
}
