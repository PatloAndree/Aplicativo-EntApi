import { StateCreator } from "zustand";
import { loginAPI, UserAPIType } from "../api/auth-api";
import { deleteLocal, getLocal, setLocal } from "../services/local-storage";
import { moverHours } from "../utilities/date-utils";
import { StoreType } from "./store";

const userKey = "user";
const timeKey = "time";

export interface AuthStoreType {
  user: UserAPIType | null;
  login: (userName: string, password: string) => any;
  loginLoading: boolean;
  loginError: boolean;
  isLogged: boolean;

  logout: () => any;
  logoutLoading: boolean;

  getUser: () => any;
  getUserLoading: boolean;
}

export const authStore: StateCreator<StoreType, [], [], AuthStoreType> = (
  set
) => ({
  user: null,
  loginLoading: false,
  loginError: false,
  isLogged: false,
  login: (userName: string, password: string) => {
    set({ loginLoading: true, loginError: false });
    loginAPI(userName, password)
      .then((user) => {
        setLocal<UserAPIType>(userKey, user);
        setLocal<Date>(timeKey, new Date());
        set({ user, loginLoading: false, isLogged: true });
      })
      .catch(() => {
        deleteLocal(userKey);
        set({
          user: null,
          loginLoading: false,
          isLogged: false,
          loginError: true,
        });
      });
  },

  logoutLoading: false,
  logout: async () => {
    set({ logoutLoading: true });
    deleteLocal(userKey);
    deleteLocal(timeKey);
    set({ logoutLoading: false, user: null, isLogged: false });
    return true;
  },

  getUserLoading: false,
  getUser: async () => {
    set({ getUserLoading: true });
    //get Local storage
    const user = getLocal<UserAPIType>(userKey);
    const lastLogged = getLocal<string>(timeKey);
    const hasTimedOut = moverHours(new Date(), -24) > new Date(lastLogged || 0);

    if (!user || hasTimedOut) {
      deleteLocal(userKey);
      deleteLocal(timeKey);
      set({ getUserLoading: false, user: null, isLogged: false });
      return;
    }
    set({ getUserLoading: false, user, isLogged: true });
  },
});
