import { IComment } from "../types.ts";

export default class Comment implements IComment {
    id!: number;
    content!: string;
    id_elo!: number;
    id_user!: number;    

    constructor(){}
} 
