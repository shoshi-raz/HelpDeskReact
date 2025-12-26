import type AuthResponse from "../models/AuthResponse";
import { createContext, useContext, useEffect, useState } from "react";
import type User from "../models/User";



interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    Login: (data: AuthResponse) => void;
    Logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    isAuthenticated: false,
    Login: () => { },
    Logout: () => { },
    isLoading: false
});
const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(() => {


        try {
            const userData = localStorage.getItem("user");
            const token = localStorage.getItem("token");
            return (userData && token) ? JSON.parse(userData) : null;
        } catch (error) {
            console.error("Failed to parse user data", error);
            return null;
        }
    });


    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {

        setIsLoading(false);

    }, []);

    const Login = (data: AuthResponse) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        setIsLoading(false);

    };

    const Logout = () => {
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };


    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, Login, Logout, isLoading }}>
            {isLoading ? null : children}
        </AuthContext.Provider>
    );
};
export { AuthContext, AuthProvider, useAuth };