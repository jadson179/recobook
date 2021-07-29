import { ILike } from "../types.ts";

export default class Like implements ILike {
    id!: number;
    content!: string;
    id_elo!: number;
    id_user!: number;

    constructor(){}
} 
