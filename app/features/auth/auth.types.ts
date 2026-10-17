import type { UserRole } from "@/models/User";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};
