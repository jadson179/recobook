import { IElo } from "../types.ts";

export default class Elo implements IElo {
    id?: number;
    description?: string;
    category?: string;
    address?: string;
    qtd_likes?: number;
    qtd_comments?: number;
    id_user?: number;

    constructor(){}


} 
