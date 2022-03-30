export interface Image {
  id: number;
  name: string;
  owner: string;
  dockerfile: string;
  image_id: string;
  status: number;
  version: string;
  desc: string;
  updated_time: string;
  created_time: string;
}
