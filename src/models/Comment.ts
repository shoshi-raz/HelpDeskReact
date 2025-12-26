

export default interface Comment {
    id: number|null;
    ticket_id: number|null;
    author_id: number|null;
    content: string;
    author_name: string|null;
    author_email: string|null;
    created_at: Date|null;
}