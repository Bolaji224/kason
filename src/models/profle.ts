import { iSocial } from "./social";

export interface iProfile {
  id?: number;
  first_name?: string;
  name?: string;
  email?: string;
  avatar?: string;
  bio?: string;
  country?: string;
  state?: string;
  city?: string;
  zip_code?: string;
  address?: string;
  expected_salary?: string;
  experience?: string;
  skills?: string;
  education?: string;
  cv?: string;
  social_medias?: iSocial[];
  [key: string]: any; // for dynamic props
}

export interface iProfileCompany {
  id?: number;
  name?: string;
  email?: string;
  status?: string;
  role?: string;
  address?: string;
  phone_no?: string;
  avatar?: string;
  about_company?: string;
  founded?: string;
  industry?: string;
  country?: string;
  company?: string; // business registration name
  website?: string;
  zipcode?: string;
  city?: string;
  state?: string;
  wallet?: string;
  company_size?: string;
  social_medias?: iSocial[];
}
