import { Role } from './role';

export class Account {
    id: number;
    nombres: string;
    primerApellido: string;
    segundoApellido?: string;
    email: string;
    role: Role;
    isVerified?: boolean;
    jwtToken?: string;
}
