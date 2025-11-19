import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  id: string;
  name: string;
  email: string;
  password: string; // necessário pois não tem backend
}

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  signIn: (data: { email: string; password: string }) => Promise<void>;
  register: (data: { name: string; email: string; password: string }) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Carrega usuário logado
  useEffect(() => {
    async function loadUser() {
      const savedUser = await AsyncStorage.getItem("@loggedUser");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      setLoading(false);
    }
    loadUser();
  }, []);

  // Registrar (salva no AsyncStorage)
  async function register({ name, email, password }: User) {
    const savedUsers = await AsyncStorage.getItem("@users");
    const users: User[] = savedUsers ? JSON.parse(savedUsers) : [];

    // Verifica se já existe
    if (users.some((u) => u.email === email)) {
      throw new Error("Email já cadastrado!");
    }

    const newUser: User = {
      id: String(Date.now()),
      name,
      email,
      password,
    };

    await AsyncStorage.setItem("@users", JSON.stringify([...users, newUser]));
  }

  // Login
  async function signIn({ email, password }: { email: string; password: string }) {
    const savedUsers = await AsyncStorage.getItem("@users");
    const users: User[] = savedUsers ? JSON.parse(savedUsers) : [];

    const found = users.find((u) => u.email === email && u.password === password);

    if (!found) {
      throw new Error("Credenciais inválidas");
    }

    await AsyncStorage.setItem("@loggedUser", JSON.stringify(found));
    setUser(found);
  }

  // Logout
  async function signOut() {
    await AsyncStorage.removeItem("@loggedUser");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, register, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
