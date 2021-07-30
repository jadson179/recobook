import { IUser } from "../types.ts";

export default class User implements IUser {
    id?: number;
    name!: string;
    email!: string;
    username!: string;
    password!: string;
    photo!: string;
    bio!: string;

    constructor(){}
    
} 




