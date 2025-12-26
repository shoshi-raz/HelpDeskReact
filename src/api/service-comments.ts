import { base_url } from "../config/api";

import type Comment from "../models/Comment";
import api from "./Axios";

const url = base_url + "tickets/";

export const getCommentsByTicketId = async (ticketId: number) => {
    try{//add barer for token

        const response=await api.get<Comment[]>(url+ticketId+"/comments");
        return response.data;
    } catch(error){
        console.error("Error during getCommentsByTicketId:", error);
        throw error;
    }
}

export const postComment=async(ticketId:number,content:string)=>{
    try{
        const response=await api.post<Comment>(url+ticketId+"/comments",{
            content
        });
        return response.data;
    } catch(error){
        console.error("Error during postComment:", error);
        throw error;
    }
}
