import React, { createContext, useContext, useState, useEffect } from "react";
import { setAuthToken, request } from "../axios_helper";
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    username:
      window.localStorage.getItem("username") !== null
        ? window.localStorage.getItem("username")
        : "guest",
    role:
      window.localStorage.getItem("role") !== null
        ? window.localStorage.getItem("role")
        : "guest",
    isLogined:
      window.localStorage.getItem("isLogined") !== null
        ? window.localStorage.getItem("isLogined") === "true"
          ? true
          : false
        : false,
    usersId: window.localStorage.getItem("usersId") !== null
            ? window.localStorage.getItem("usersId")
            : "",
    cartId: window.localStorage.getItem("cartId") !== null
    ? window.localStorage.getItem("cartId")
    : "",
  });
  const getDataUser = () => {
    request("GET", `/api/v1/users/username/${user.username}`, {})
      .then((response) => {
        setUser((prevUser) => ({
          ...prevUser,
          username: response.data.data.username,
          role: response.data.data.role,
          isLogined: true,
          usersId: response.data.data.id,
        }));
        window.localStorage.setItem("username", response.data.data.username);
        window.localStorage.setItem("role",response.data.data.role);
        window.localStorage.setItem("isLogined", true);
        window.localStorage.setItem("usersId", response.data.data.id);
        window.localStorage.setItem("cartId", response.data.data.cartId);
      })
      .catch((error) => {
        handleLogout();
      });
  };
  const getCartData = () => {
    request("GET", `/api/v1/cart/users/${user.username}`, {})
      .then((response) => {
        setUser((prevUser) => ({
          ...prevUser,
          cartId: response.data.data.id
        }));
        window.localStorage.setItem("cartId", response.data.data.id);
      })
      .catch((error) => {
        handleLogout();
      });
  }
  useEffect(() => {
    if (window.localStorage.getItem("role") !== "guest") {
        getDataUser();
        getCartData();
    }
  },[user.username]);
  const handleLogin = (loginResponse) => {
    setUser({
      username: loginResponse.data.data.username,
      role: loginResponse.data.data.role,
      isLogined: true
    });
    window.localStorage.setItem("username", loginResponse.data.data.username);
    window.localStorage.setItem("role", loginResponse.data.data.role);
    window.localStorage.setItem("isLogined", true);
  };

  const handleLogout = () => {
    setAuthToken(null);
    setUser({
      username: "guest",
      role: "guest",
      isLogined: false,
      usersId: "guest",
      cartId: "guest",
    });
    window.localStorage.setItem("username", "guest");
    window.localStorage.setItem("role", "guest");
    window.localStorage.setItem("isLogined", false);
    window.localStorage.setItem("usersId", "guest");
    window.localStorage.setItem("cartId", "guest");
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
