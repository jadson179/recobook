// deno-lint-ignore-file
export interface IUser {
    id?: number;
    name?: string
    email?: string
    username?: string
    password?: string
    photo?: string
    bio?: string
}

export interface IElo {
    id?: number;
    description?: string;
    category?: string;
    address?: string;
    qtd_likes?: number;
    qtd_comments?: number;
    id_user?: number;
}

export interface IComment {
    id: number;
    content: string;
    id_elo: number;
    id_user: number;
}

export interface ILike {
    id: number;
    content: string;
    id_elo: number;
    id_user: number;
} 

export interface IVideo {
    id: number;
    url: string;
    id_elo: number;
}

export interface Payload {
    data: {
      id: number;
      name: string,
      email: string,
      username: string,
      photo: string,
      bio: string
    },
    type: string,
    exp: number
}
