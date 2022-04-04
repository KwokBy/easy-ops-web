export type infoType = {
  svg?: string;
  code?: number;
  info?: string;
  accessToken?: string;
};

export interface Table {
  label: string;
  prop: string;
  align: string;
}

export interface State {
  os: OS;
  cpu: CPU;
  disk: Disk;
  ram: Ram;
}

export interface OS {
  goos: string;
  numCpu: number;
  compiler: string;
  goVersion: string;
  numGoroutine: number;
}

export interface CPU {
  cores: number;
  cpus: CPUInfo[];
}

export interface CPUInfo {
  percentage: number;
}

export interface Disk {
  total_mb: number;
  used_mb: number;
  total_gb: number;
  used_gb: number;
  used_percent: number;
}

export interface Ram {
  total_mb: number;
  used_mb: number;
  total_gb: number;
  used_gb: number;
  used_percent: number;
}
