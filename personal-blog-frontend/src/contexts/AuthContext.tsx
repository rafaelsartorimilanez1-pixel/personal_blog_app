import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { getAdminStatus } from "../services/adminService";

interface TokenPayload {
  userId: string;
}

interface AuthContextType {
  token: string | null;
  userId: string | null;
  isAdmin: boolean;
  setToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  userId: null,
  isAdmin: false,
  setToken: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setTokenState] = useState<string | null>(() => {
    return localStorage.getItem("token");
  });

  const [isAdmin, setIsAdmin] = useState(false);

  const userId = token
    ? (() => {
        try {
          return jwtDecode<TokenPayload>(token).userId;
        } catch {
          return null;
        }
      })()
    : null;

  useEffect(() => {
    if (!token) {
      setIsAdmin(false);
      return;
    }

    getAdminStatus()
      .then((result) => setIsAdmin(result))
      .catch(() => setIsAdmin(false));
  }, [token]);

  function saveToken(token: string | null) {
    setTokenState(token);

    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }

  return (
    <AuthContext.Provider
      value={{ token, userId, isAdmin, setToken: saveToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
