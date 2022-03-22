export interface Host {
  id: number;
  host: string;
  host_name: string;
  user: string;
  name: string;
  owner: string;
  password: string;
  desc: string;
  port: number;
  updated_time: string;
}

export interface Response {
  code: number;
  data: Host[];
  msg: string;
}
