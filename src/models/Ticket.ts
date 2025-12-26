
export default interface Ticket {
    id: number | null;
    subject: string | null;
    description: string | null;
    status_id: number ;
    priority_id: number;
    status_name: string | null;
    priority_name: string | null;
    created_by: number | null;
    assigned_to: number ;
    created_at: Date | null;
    updated_at: Date | null;

}