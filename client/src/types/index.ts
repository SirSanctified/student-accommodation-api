export type RegisterType = {
  email: string;
  password: string;
  password2: string;
  first_name: string;
  last_name: string;
};

export type LoginType = {
  email: string;
  password: string;
};

export type User = {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  is_student: boolean;
  is_landlord: boolean;
};

export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  loginUser: (user: User) => void;
  logoutUser: () => void;
};

export type ErrorResponse = {
  detail: string;
};

export type ComboboxOption = {
  value: string;
  label: string;
};

export type InstitutionAndCityResponse = {
  name: string;
  id: number;
  url?: string;
};

export type Institution = {
  name: string;
  id: number;
  city: string;
  url?: string;
};

export type City = {
  name: string;
  id: number;
  url?: string;
};

export type Property = {
  url?: string;
  id: string;
  landlord: string;
  owner: string;
  name: string;
  images?: string[];
  description: string;
  city: City;
  location: string;
  street: string;
  number: string;
  total_rooms: number;
  rooms_single: number;
  price_single: number;
  price_shared: string;
  amenities: string;
  reviews: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export type PropertyFormProps = {
  action: string;
  propertyData?: Property;
};
