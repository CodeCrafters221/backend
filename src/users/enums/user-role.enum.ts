import { registerEnumType } from "@nestjs/graphql";

export enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER',
    CLIENT = 'CLIENT',
    AGENT = 'AGENT'

}

registerEnumType(UserRole, { name: 'UserRole', description: "Possible user role" });