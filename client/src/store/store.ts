"use client";
import {
  type RoomState,
  type AuthState,
  type PropertyState,
  type User,
} from "@/types";
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
