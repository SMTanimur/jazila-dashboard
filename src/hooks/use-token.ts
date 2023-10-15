import { AUTH_TOKEN_KEY } from "@/constants";
import Cookies from "js-cookie";

export function useToken() {
  return {
    setToken(token: string) {
      Cookies.set(AUTH_TOKEN_KEY as string, token, { expires: 1 });
    },
    getToken() {
      return Cookies.get(AUTH_TOKEN_KEY as string);
    },
    removeToken() {
      Cookies.remove(AUTH_TOKEN_KEY as string);
    },
    hasToken() {
      const token = Cookies.get(AUTH_TOKEN_KEY as string);
      if (!token) return false;
      return true;
    },
  };
}
