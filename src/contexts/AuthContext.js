import { createContext, useContext, useState, useEffect } from "react";
import { apiCall } from "../utils/apiCall";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token) {
      if (userData) {
        try {
          setUser(JSON.parse(userData));
        } catch (e) {
          setUser(null);
        }
      } else {
        setUser({ token });
      }
    } else {
      setUser(null);
    }

    setLoading(false);
  }, []);

  const login = (userData) => {
    // userData matches the "data" object from the successful login response
    if (userData.token) {
      localStorage.setItem("token", userData.token);
    }
    if (userData.username) {
      localStorage.setItem("username", userData.username);
    }
    if (userData.mobile) {
      localStorage.setItem("mobile", userData.mobile);
    }
    if (userData.user_type) {
      localStorage.setItem("user_type", userData.user_type);
    }
    
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      clearSession();
      return;
    }

    try {
      const response = await apiCall("/auth/logout", "POST");
      if (response && !response.ok) {
        console.error("Logout API call failed with status:", response.status);
      }
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      clearSession();
    }
  };

  const clearSession = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("mobile");
    localStorage.removeItem("user_type");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
