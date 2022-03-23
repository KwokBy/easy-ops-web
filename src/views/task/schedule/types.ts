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

export interface Table {
  label: string;
  prop: string;
  align: string;
}

export interface History {
  exec_time: string;
  status: number;
  task_id: number;
  exec_id: number;
}

export interface HistoryInfo {
  avg_count: number;
  fail_count: number;
  success_count: number;
  exec_histories: ExecHistory[];
}

export interface ExecHistory {
  id: number;
  task_id: number;
  type: number;
  status: number;
  content: string;
  host_name: string;
  created_time: string;
  time_consume: number;
}
