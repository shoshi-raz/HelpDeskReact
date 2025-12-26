export default interface User{
   id: number|null;
   name: string;
   email: string;  
   password: string|null;
   role: UserRole;
   created_at: Date;
}
export type UserRole = 'admin' | 'agent' | 'customer';
