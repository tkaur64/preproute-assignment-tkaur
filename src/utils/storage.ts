import { STORAGE_KEYS } from "../constants/storage";
import type { User } from "../types/auth";

export const saveToken = (token: string) => {
  localStorage.setItem(STORAGE_KEYS.TOKEN, token);
};

export const getToken = () => {
  return localStorage.getItem(STORAGE_KEYS.TOKEN);
};

export const removeToken = () => {
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
};

export const saveUser = (user: User) => {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
};

export const getUser = (): User | null => {
  const user = localStorage.getItem(STORAGE_KEYS.USER);

  return user ? JSON.parse(user) : null;
};

export const removeUser = () => {
  localStorage.removeItem(STORAGE_KEYS.USER);
};
