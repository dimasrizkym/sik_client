import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

// next kl ada API beneran
// import {
//   login as apiLogin,
//   register as apiRegister,
// } from "@/api/services/auth.service";
import type { LoginValues, RegisterValues } from "@/validations/AuthSchemas";
// import apiClient from "@/api/axios";

interface User {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "USER";
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (credentials: LoginValues) => Promise<User>;
  register: (data: RegisterValues) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("authToken")
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Cek token saat aplikasi dimuat
    const validateToken = async () => {
      if (token) {
        try {
          // TODO: Panggil endpoint API '/auth/profile' untuk verifikasi token dan dapatkan data user
          // const userData = await api.get('/auth/profile');
          // setUser(userData.data);
          // Untuk sekarang kita mock data user jika ada token
          setUser({
            id: "1",
            name: "Admin Mock",
            email: "admin@test.com",
            role: "ADMIN",
          });
        } catch (error) {
          // Token tidak valid
          localStorage.removeItem("authToken");
          setToken(null);
          setUser(null);
        }
      }
      setIsLoading(false);
    };
    validateToken();
  }, [token]);

  const login = async (credentials: LoginValues) => {
    // Ganti dengan pemanggilan API sesungguhnya
    // const response = await apiLogin(credentials);
    // const { token, user } = response.data;
    const mockResponse = {
      token: "fake-jwt-token",
      user: {
        id: "1",
        name: "Admin Mock",
        email: credentials.email,
        role: "ADMIN" as "ADMIN",
      },
    };

    localStorage.setItem("authToken", mockResponse.token);
    setToken(mockResponse.token);
    setUser(mockResponse.user);

    return mockResponse.user; // Kembalikan data user
  };

  const register = async (data: RegisterValues) => {
    // Ganti dengan pemanggilan API sesungguhnya
    // await apiRegister(data);
    console.log("Registered with:", data);
    // setelah register berhasil, user akan diarahkan ke halaman login
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setToken(null);
    setUser(null);
  };

  const value = {
    isAuthenticated: !!token,
    user,
    token,
    login,
    register,
    logout,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

// Custom hook untuk mempermudah penggunaan context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
