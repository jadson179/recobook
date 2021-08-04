import { ILike } from "../types.ts";

export default class Like implements ILike {
    id?: number;
    id_elo?: number;
    id_user?: number;

    constructor(){}
} 
