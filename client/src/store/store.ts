"use client";
import {
  type RoomState,
  type AuthState,
  type PropertyState,
  type User,
  type GetPropertiesState,
  type AxiosErrorWithDetails,
  type PropertiesResponse,
  type Property,
  type GetRoomsState,
  type RoomsResponse,
  type Room,
} from "@/types";
import axios from "axios";
import { create } from "zustand";

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: (() => {
    if (typeof window !== "undefined") {
      const authData = JSON.parse(localStorage.getItem("auth") ?? "{}") as {
        user: User;
        isAuthenticated: boolean;
      };
      return authData.isAuthenticated;
    }
    return false;
  })(),
  user:
    (() => {
      if (typeof window !== "undefined") {
        return JSON.parse(localStorage.getItem("auth") ?? "{}") as {
          user: User;
          isAuthenticated: boolean;
        };
      }
      return null;
    })()?.user ?? null,
  loginUser: (user: User) =>
    set((state) => {
      localStorage.setItem(
        "auth",
        JSON.stringify({
          user: {
            id: user.id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            is_student: user.is_student,
            is_landlord: user.is_landlord,
          },
          isAuthenticated: true,
        }),
      );
      return {
        ...state,
        user,
        isAuthenticated: true,
      };
    }),
  logoutUser: () =>
    set((state) => {
      localStorage.removeItem("auth");
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    }),
}));

export const usePropertyStore = create<PropertyState>((set) => ({
  property: {
    name: "",
    owner: "",
    is_published: false,
    property_type: "boarding house",
    location: "",
    city: "",
    street: "",
    number: "",
    amenities: [],
  },
  setLocation: (location) =>
    set((state) => ({ property: { ...state.property, location } })),
  setName: (name) =>
    set((state) => ({ property: { ...state.property, name } })),
  setPropertyType: (property_type) =>
    set((state) => ({ property: { ...state.property, property_type } })),
  setCity: (city) =>
    set((state) => ({ property: { ...state.property, city } })),
  setStreet: (street) =>
    set((state) => ({ property: { ...state.property, street } })),
  setNumber: (number) =>
    set((state) => ({ property: { ...state.property, number } })),
  setAmenities: (amenities) =>
    set((state) => ({ property: { ...state.property, amenities } })),
}));

export const useRoomState = create<RoomState>((set) => ({
  room: {
    name: "",
    property: "",
    description: "",
    room_type: "single",
    num_beds: 1,
    occupied_beds: 0,
    available_beds: 1,
    price: 0,
    is_available: true,
    display_image: "",
    images: [],
  },
  setName: (name) => set((state) => ({ room: { ...state.room, name } })),
  setProperty: (property) =>
    set((state) => ({ room: { ...state.room, property } })),
  setDescription: (description) =>
    set((state) => ({ room: { ...state.room, description } })),
  setRoomType: (room_type) =>
    set((state) => ({ room: { ...state.room, room_type } })),
  setAvailableBeds: (available_beds) =>
    set((state) => ({ room: { ...state.room, available_beds } })),
  setDisplayImage: (display_image) =>
    set((state) => ({ room: { ...state.room, display_image } })),
  setImages: (images) => set((state) => ({ room: { ...state.room, images } })),
  setNumBeds: (num_beds) =>
    set((state) => ({ room: { ...state.room, num_beds } })),
  setOccupiedBeds: (occupied_beds) =>
    set((state) => ({ room: { ...state.room, occupied_beds } })),
  setPrice: (price) => set((state) => ({ room: { ...state.room, price } })),
  setIsAvailable: (is_available) =>
    set((state) => ({ room: { ...state.room, is_available } })),
}));

export const useGetProperties = create<GetPropertiesState>((set) => ({
  property: null,
  properties: [],
  getProperties: async () => {
    try {
      const response = await axios.get<PropertiesResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/properties/`,
      );
      if (response.status === 200) {
        if (response.data.results) {
          set((state) => ({ ...state, properties: response.data.results }));
          return response.data;
        }
      }
      return null;
    } catch (error) {
      const errorMessage =
        (error as AxiosErrorWithDetails)?.response?.data?.detail ??
        "An unexpected error has occurred";
      return errorMessage;
    }
  },
  getProperty: async (id) => {
    try {
      const response = await axios.get<Property>(
        `${process.env.NEXT_PUBLIC_API_URL}/properties/${id}`,
      );
      if (response.status === 200) {
        if (response.data) {
          set((state) => ({ ...state, property: response.data }));
          return response.data;
        }
      }
      return null;
    } catch (error) {
      const errorMessage =
        (error as AxiosErrorWithDetails)?.response?.data?.detail ??
        "An unexpected error has occurred";
      return errorMessage;
    }
  },
  getPropertiesByCity: async (city) => {
    try {
      const response = await axios.get<PropertiesResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/properties/?city=${city}`,
      );
      if (response.status === 200) {
        if (response.data.results) {
          set((state) => ({ ...state, properties: response.data.results }));
          return response.data;
        }
      }
      return null;
    } catch (error) {
      const errorMessage =
        (error as AxiosErrorWithDetails)?.response?.data?.detail ??
        "An unexpected error has occurred";
      return errorMessage;
    }
  },
  getPropertiesByLandlord: async (landlordId) => {
    try {
      const response = await axios.get<PropertiesResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/properties/?landlord=${landlordId}`,
      );
      if (response.status === 200) {
        if (response.data.results) {
          set((state) => ({ ...state, properties: response.data.results }));
          return response.data;
        }
      }
      return null;
    } catch (error) {
      const errorMessage =
        (error as AxiosErrorWithDetails)?.response?.data?.detail ??
        "An unexpected error has occurred";
      return errorMessage;
    }
  },
}));

export const useGetRooms = create<GetRoomsState>((set) => ({
  rooms: [],
  room: null,
  getRooms: async () => {
    try {
      const response = await axios.get<RoomsResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/rooms/`,
      );
      if (response.status === 200) {
        if (response.data.results) {
          set((state) => ({ ...state, rooms: response.data.results }));
          return response.data;
        }
      }
      return null;
    } catch (error) {
      const errorMessage =
        (error as AxiosErrorWithDetails)?.response?.data?.detail ??
        "An unexpected error has occurred";
      return errorMessage;
    }
  },
  getRoom: async (id) => {
    try {
      const response = await axios.get<Room>(
        `${process.env.NEXT_PUBLIC_API_URL}/rooms/${id}`,
      );
      if (response.status === 200) {
        if (response.data) {
          set((state) => ({ ...state, room: response.data }));
          return response.data;
        }
      }
      return null;
    } catch (error) {
      const errorMessage =
        (error as AxiosErrorWithDetails)?.response?.data?.detail ??
        "An unexpected error has occurred";
      return errorMessage;
    }
  },

  getRoomsByCity: async (city) => {
    try {
      const response = await axios.get<RoomsResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/rooms/?city=${city}`,
      );
      if (response.status === 200) {
        if (response.data.results) {
          set((state) => ({ ...state, rooms: response.data.results }));
          return response.data;
        }
      }
      return null;
    } catch (error) {
      const errorMessage =
        (error as AxiosErrorWithDetails)?.response?.data?.detail ??
        "An unexpected error has occurred";
      return errorMessage;
    }
  },
  getRoomsByNumberOfBeds: async (numOfBeds) => {
    try {
      const response = await axios.get<RoomsResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/rooms/?numOfBeds=${numOfBeds}`,
      );
      if (response.status === 200) {
        if (response.data.results) {
          set((state) => ({ ...state, rooms: response.data.results }));
          return response.data;
        }
      }
      return null;
    } catch (error) {
      const errorMessage =
        (error as AxiosErrorWithDetails)?.response?.data?.detail ??
        "An unexpected error has occurred";
      return errorMessage;
    }
  },
  getRoomsByOccupiedBeds: async (occupiedBeds) => {
    try {
      const response = await axios.get<RoomsResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/rooms/?occupiedBeds=${occupiedBeds}`,
      );
      if (response.status === 200) {
        if (response.data.results) {
          set((state) => ({ ...state, rooms: response.data.results }));
          return response.data;
        }
      }
      return null;
    } catch (error) {
      const errorMessage =
        (error as AxiosErrorWithDetails)?.response?.data?.detail ??
        "An unexpected error has occurred";
      return errorMessage;
    }
  },
  getRoomsByPrice: async (price) => {
    try {
      const response = await axios.get<RoomsResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/rooms/?price=${price}`,
      );
      if (response.status === 200) {
        if (response.data.results) {
          set((state) => ({ ...state, rooms: response.data.results }));
          return response.data;
        }
      }
      return null;
    } catch (error) {
      const errorMessage =
        (error as AxiosErrorWithDetails)?.response?.data?.detail ??
        "An unexpected error has occurred";
      return errorMessage;
    }
  },
  getRoomsByType: async (type) => {
    try {
      const response = await axios.get<RoomsResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/rooms/?type=${type}`,
      );
      if (response.status === 200) {
        if (response.data.results) {
          set((state) => ({ ...state, rooms: response.data.results }));
          return response.data;
        }
      }
      return null;
    } catch (error) {
      const errorMessage =
        (error as AxiosErrorWithDetails)?.response?.data?.detail ??
        "An unexpected error has occurred";
      return errorMessage;
    }
  },
}));
