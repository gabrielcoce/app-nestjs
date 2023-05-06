import { Role } from '../enums/role.enum';

type User = {
  email: string;
  role: Role[];
};

export interface IAuthenticate {
  readonly user: User;
}
