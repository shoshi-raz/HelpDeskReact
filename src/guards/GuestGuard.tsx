import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "../components/UI/LoadSpinner";

//רק למשתמשים שלא מחוברים
const GuestGuard = () => {
    const auth = useAuth();
    if (auth.isLoading) {
        return <LoadingSpinner />;
    }
    if (auth.user) {
        return <Navigate to="/dashboard" replace />;
    }
    return (<Outlet />);
};

export default GuestGuard;
