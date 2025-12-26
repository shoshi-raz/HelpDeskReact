import axios from "axios";
import { base_url } from "../config/api";
import type AuthResponse from "../models/AuthResponse";



const url = base_url + "auth/";
export const postLogin=async(email:string,password:string) => {
    try{
    const response=await axios.post<AuthResponse>(url+"login",{
        email,
        password
    });
    return response.data;
    } catch(error){
        console.error("Error during login:", error);
        throw error;
    }
}

export const postRegister=async(name:string,email:string,password:string)=>{
    try{ 
    const response=await axios.post<AuthResponse>(url+"register",{
        name,
        email,
        password
    }, );
    return response.data;
    } catch(error){
        console.error("Error during register:", error);
        throw error;
    }
}

// const getAuth=async():Promise<AuthResponse>=>{
//     try{
//     const response=await axios.get<AuthResponse>(url+"me",{
//         headers:{
//             Authorization:`Bearer ${localStorage.getItem("token")}`
//         }
//     })}  
    
//     catch(error){
//         console.error("Error during getAuth:", error);
//         throw error;
//     }
//     return response.data;
// }