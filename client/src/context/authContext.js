import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const storedUser = localStorage.getItem("user");
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      // Tenta fazer o parse da string JSON armazenada
      return JSON.parse(storedUser) || null;
    } catch (error) {
      console.error("Erro ao fazer o parse do JSON em localStorage:", error);
      return null;
    }
  });

  const login = async (inputs) => {
    try {
      const res = await axios.post("http://localhost:8800/api/auth/login", inputs, {
        withCredentials: true,
      });

      setCurrentUser(res.data);
    } catch (error) {
      console.error("Erro ao fazer login:", error.response || error.message || error);
    }
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
