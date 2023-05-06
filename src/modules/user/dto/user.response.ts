import { Role } from "src/modules/auth/enums/role.enum";

export class UserResponse {
  email: string;
  role: Role[];
  constructor(email: string, role: Role[]) {
    this.email = email;
    this.role = role;
  }
}