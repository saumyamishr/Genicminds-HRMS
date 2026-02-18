export type UserRole = "ADMIN" | "HR" | "EMPLOYEE";

export interface AuthUser {
  id: string;
  name: string;
  role: UserRole;
  token: string;
}
