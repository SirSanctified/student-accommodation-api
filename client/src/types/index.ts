export type RegisterType = {
  email: string;
  phone: string;
  password: string;
  password2: string;
  first_name: string;
  last_name: string;
};

export type LoginType = {
  email: string;
  password: string;
};

export type PreferredPaymentMethods =
  | "ecocash usd"
  | "bank transfer"
  | "cash usd"
  | "other";

export type User = {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  is_student: boolean;
  is_landlord: boolean;
};

export type Landlord = {
  user: User | string;
  city: string;
  address: string;
  bank_name: string;
  account_name: string;
  account_number: string;
  ecocash_number: string;
  preferred_payment_method: PreferredPaymentMethods;
  is_verified?: boolean;
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

export type Amenity = {
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

export type RoomType =
  | "single"
  | "double"
  | "triple"
  | "quadruple"
  | "dormitory";

export type Property = {
  url?: string;
  id?: string;
  owner: string;
  name: string;
  city: string;
  location: string;
  street: string;
  number: string;
  property_type: PropertyType;
  amenities?: string[];
  reviews?: [];
  rooms?: Room[];
  is_published: boolean;
};

export type Room = {
  property: Property | string;
  name: string;
  description: string;
  room_type: RoomType;
  num_beds: number;
  occupied_beds: number;
  available_beds: number;
  price: number;
  is_available: boolean;
  display_image: string;
  url?: string;
  images?: File[];
  id?: number;
};

export type PropertyFormProps = {
  action: string;
  userId: string;
  propertyData?: Property;
};

export type RoomsListProps = {
  room: Room;
  property?: Property;
};

export type PropertyState = {
  property: Property;
  setLocation: (location: string) => void;
  setName: (name: string) => void;
  setCity: (city: string) => void;
  setPropertyType: (propertyType: PropertyType) => void;
  setAmenities: (amenities: string[]) => void;
  setStreet: (street: string) => void;
  setNumber: (number: string) => void;
};

export type RoomState = {
  room: Room;
  setName: (name: string) => void;
  setProperty: (property: string) => void;
  setDescription: (description: string) => void;
  setRoomType: (roomType: RoomType) => void;
  setNumBeds: (numBeds: number) => void;
  setOccupiedBeds: (occupiedBeds: number) => void;
  setAvailableBeds: (availableBeds: number) => void;
  setPrice: (price: number) => void;
  setIsAvailable: (isAvailable: boolean) => void;
  setDisplayImage: (displayImage: string) => void;
  setImages: (images: File[]) => void;
};
