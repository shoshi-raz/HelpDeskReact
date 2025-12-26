import type { UserRole } from "../models/User";
import {  useAuth } from "../context/AuthContext";
import { Outlet, Navigate } from "react-router-dom";
import LoadingSpinner from "../components/UI/LoadSpinner";

interface AuthGuardProps {
    allowedRoles: UserRole[];
}
//כניסה למשתמשים לפי התפקידים
export  const AuthGuard=({allowedRoles}:AuthGuardProps)=>{
    
const auth = useAuth();
    if(auth.isLoading){
        return <LoadingSpinner />;
    }   
    if(!auth.user){
        return <Navigate to="/login" replace />;
    }
    if(!allowedRoles.includes(auth.user.role)){
        return <Navigate to="/dashboard" replace />;
    }
    return <Outlet />;
}
export default AuthGuard;