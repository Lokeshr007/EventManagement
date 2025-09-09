import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Provide token derived from user
  return (
    <AuthContext.Provider value={{ user, setUser, token: user?.token }}>
      {children}
    </AuthContext.Provider>
  );
};
