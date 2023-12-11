export interface Facebook {
  current_page: number;
  total_page: number;
  per_page: number;
  total: number;
  sort: string;
  sort_order: string;
  ads_count: number;
  data: Datum[];
  statuses: string[];
  all_statuses: string[];
  geo: Geo[];
}

interface Geo {
  geo: string;
}

export interface Datum {
  checked?: boolean
  id: number;
  image_url: string;
  data: Data;
  st: string;
  status: number;
  hand_mode: number;
  created_at: string;
}

interface Data {
  name: string;
  city?: any;
  days: number;
  login: string;
  email: string;
  friends: number;
  token_bm?: any;
  id_bm?: any;
  link_bm: string;
  birthday: string;
  ID_akk: string;
  fanpage?: any;
  useragent?: any;
  phone?: any;
  linksSelfy?: any;
  tokenMess?: any;
}
