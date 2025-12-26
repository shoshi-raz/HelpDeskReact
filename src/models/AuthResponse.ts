import type User from "./User";

export default interface AuthResponse {
    token: string;
    user: User
}