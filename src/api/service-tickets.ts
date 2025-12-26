import { base_url } from "../config/api"
import type Ticket from "../models/Ticket"
import api from "./Axios"
const url = base_url + "tickets/"

export const getTickets = async () => {
    try {
        const response = await api.get<Ticket[]>(url);
        return response.data;
    } catch (error) {
        console.error("Error during getTickets:", error);
        throw error;
    }
}

export const creatTicket =
    //only customer can create ticket
    async (subject: string, description: string, status_id: number, priority_id: number, assigned_to: number) => {
        try {
            const response = await api.post<Ticket>(url, {
                subject,
                description,
                status_id,
                priority_id,
                assigned_to
            });
            return response.data;
        } catch (error) {
            console.error("Error during postTicket:", error);
            throw error;
        }
    }

export const getTicketById = async (id: number) => {
    try {
        const response = await api.get<Ticket>(url + id);
        return response.data;
    } catch (error) {
        console.error("Error during getTicketById:", error);
        throw error;
    }
}

export const updateTicket = async (id: number, status_id: number, priority_id: number, assigned_to: number) => {
    //only agent/admin can update ticket
    try {
        const response = await api.patch<Ticket>(url + id, {

            status_id,
            priority_id,
            assigned_to
        });
        return response.data;
    } catch (error) {
        console.error("Error during updateTicket:", error);
        throw error;
    }
}
export const deleteTicket = async (id: number) => {
    //only admin can delete ticket
    try {
        const response = await api.delete<Ticket>(url + id);
        return response.data;
    } catch (error) {
        console.error("Error during deleteTicket:", error);
        throw error;
    }
}