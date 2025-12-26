import { base_url } from "../config/api";
import api from "./Axios";
import type Status from "../models/Status";


const url = base_url + "statuses/";

export const getStatuses = async () => {

    try {
        const response = await api.get<Status[]>(url);
        return response.data;
    } catch (error) {
        console.error("Error during getStatuses:", error);
        throw error;
    }
}

export const createStatus = async (name: string) => {
    //only admin can create status
    try {
        const response = await api.post<Status>(url, {name});
        return response.data;
    } catch (error) {
        console.error("Error during createStatus:", error);
        throw error;
    }

}

