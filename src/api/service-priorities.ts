import { base_url } from "../config/api";
import api from "./Axios";
import type Priority from "../models/Priority";

const url = base_url + "priorities/"


export const getPriorities = async () => {
    try {
        const response = await api.get<Priority[]>(url);
        return response.data;
    } catch (error) {
        console.error("Error during getPriorities:", error);
        throw error;
    }
}

export const createPriority = async (name: string) => {

    try {
        const response = await api.post<Priority>(url, {name});
        return response.data;
    } catch (error) {
        console.error("Error during createPriority:", error);
        throw error;
    }
}