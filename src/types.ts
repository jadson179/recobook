export interface User {
    id: number;
    name: string
    email: string
    username: string
    password: string
    photo: string
    bio: string
}

export interface Elo {
    id: number;
    description: string;
    category: string;
    address: string;
    qtd_likes: number;
    qtd_comments: number;
    id_user: number;
}

export interface Comment {
    id: number;
    content: string;
    id_elo: number;
    id_user: number;
}

export interface Like {
    id: number;
    content: string;
    id_elo: number;
    id_user: number;
} 

export interface Video {
    id: number;
    url: string;
    id_elo: number;
}