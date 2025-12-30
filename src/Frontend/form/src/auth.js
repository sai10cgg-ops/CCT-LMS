
import Cookies from "js-cookie";

export const isAuthenticated = () => {
  return Cookies.get("token") ? true : false;
};

export const getUserRole = () => {
  return Cookies.get("role"); // ADMIN / USER
};

export const logout = () => {
  Cookies.remove("token");
  Cookies.remove("role");
};
