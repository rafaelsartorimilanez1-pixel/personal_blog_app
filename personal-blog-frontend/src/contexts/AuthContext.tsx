import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  userId: string;
}

interface AuthContextType {
  token: string | null;
  userId: string | null;
  setToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  userId: null,
  setToken: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setTokenState] = useState<string | null>(() => {
    return localStorage.getItem("token");
  });

  const userId = token
    ? (() => {
        try {
          return jwtDecode<TokenPayload>(token).userId;
        } catch {
          return null;
        }
      })()
    : null;

  function saveToken(token: string | null) {
    setTokenState(token);

    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }

  return (
    <AuthContext.Provider value={{ token, userId, setToken: saveToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
