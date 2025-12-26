import { Navigate} from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import  {type UserRole}  from "../models/User";
import AdminDashboard from "./AdminDashboard";
import AgentDashboard from "./AgentDashboard";
import CustomerDashboard from "./CustomerDashboard";


const DashboardRedirect = () => {
const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;  

  //  const rolesMap: Record<UserRole,string>= {
  //   "admin":"/admin",
  //   "agent":"/agent",
  //   "customer":"/customer"
  //  }
  //  return <Navigate to ={rolesMap[user.role]|| "/login"} replace />;
  if(user.role==="admin")
    return<AdminDashboard></AdminDashboard>
  if(user.role==="agent")
    return<AgentDashboard></AgentDashboard>
  if(user.role==="customer")
    return <CustomerDashboard></CustomerDashboard>
  
  return  <Navigate to="/login" replace />

}

export default DashboardRedirect


