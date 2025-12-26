import type User from "../models/User"
import { base_url } from "../config/api"
import api from "./Axios";

const url = base_url + "users/"
//בעמוד זה רק  admin יכול לבצע את הקריאות
export const getUsers = async () => {
    try {
        const response = await api.get<User[]>(url);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};


export const createUser = async (name: string, email: string, password: string,role:string) => {
    try {
    const response = await api.post<User>(url, {
        name,
        email,
        password,
        role
    });
    return response.data;
    } catch(error){
        console.error("Error during postUser:", error);
        throw error;
    }
}

export const getUserById = async (id: number) => {
    try {
        const response = await api.get<User>(url + id);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};