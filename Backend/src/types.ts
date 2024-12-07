import type { JwtPayload } from "jsonwebtoken"

export type UserType = {
    _id?:string,
    username:string,
    password:string,
    refreshToken:string|null;
}

export interface customJWTtype extends JwtPayload{
    Id:string,
    username:string,
    refreshToken:string,
}

