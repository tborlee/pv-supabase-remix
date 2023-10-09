export interface Walk {
  id: number;
  activity: string;
  organizer: string;
  entity: string;
  ign: string;
  locality: string;
  transport: string;
  meeting_point_info: string;
  province: string;
  contact_first_name: string;
  contact_last_name: string;
  contact_phone_number: string;
  status: string;
  meeting_point: string;
  date: string;
  fifteen_km: boolean;
  wheelchair: boolean,
  stroller: boolean;
  extra_orientation: boolean;
  guided: boolean;
  extra_walk: boolean;
  bike: boolean;
  mountain_bike: boolean;
  water_supply: boolean;
  be_wapp: boolean;
  adep_sante: boolean;
  latitude: number;
  longitude: number;
  distance: number;
  favorite?: boolean;
}