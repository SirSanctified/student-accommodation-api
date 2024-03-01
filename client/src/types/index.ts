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
