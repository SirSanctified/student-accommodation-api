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

export type PropertyType =
  | "boarding house"
  | "hostel"
  | "house"
  | "apartment"
  | "cottage";

export type Property = {
  url?: string;
  id?: string;
  owner: string;
  name: string;
  city: City;
  location: string;
  street: string;
  number: string;
  property_type: PropertyType;
  amenities?: string[];
  reviews?: [];
  is_published: boolean;
};

export type Room = {
  property: Property | string;
  name: string;
  description: string;
  room_type: string;
  num_beds: number;
  occupied_beds: number;
  available_beds: number;
  price: number;
  is_available: boolean;
  display_image: string;
  url?: string;
  images?: [];
};

export type PropertyFormProps = {
  action: string;
  propertyData?: Property;
};
