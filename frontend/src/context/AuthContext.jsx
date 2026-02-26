import { createContext, useContext, useEffect, useState } from "react";
import API from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // check logged-in user on app start
  useEffect(() => {
    const fetchMe = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await API.get("/auth/me");
        setUser(res.data);
      } catch {
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    fetchMe();
  }, []);

  // login
const login = async (email, password) => {
  const res = await API.post("/auth/login", { email, password });

  localStorage.setItem("token", res.data.token);
  setUser(res.data.user);

  return res.data.user; // ⭐ VERY IMPORTANT
};


  // register
  const register = async (data) => {
    const res = await API.post("/auth/register", data);
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
  };

  // logout
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
