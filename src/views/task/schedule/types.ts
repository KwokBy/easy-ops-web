export interface Schedule {
  id: number;
  name: string;
  owner: string;
  content: string;
  host_ids: number[];
  spec: string;
  exec_ids: number[];
  status: number;
  desc: string;
  updated_time: string;
  created_time: string;
  start: string;
  end: string;
}
