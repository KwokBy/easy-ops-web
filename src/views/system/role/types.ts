export interface Role {
  id: number;
  role_id: number;
  name_zh: string;
  desc: string;
}

export interface Api {
  id: number;
  models_name: string;
  name: string;
  method: string;
  desc: string;
}

export interface Casbin {
  role_id: string;
  casbin_info: CasbinInfo[];
}
export interface CasbinInfo {
  path: string;
  method: string;
}
