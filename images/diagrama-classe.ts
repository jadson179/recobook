export class Elo {
    private id: number
    private description: string 
    private qtd_likes: number
    private qtd_comments: number
    private address: string
    private user: User
}

export class User {
    private id:number
    private name:string
    private email:string
    private username:string
    private password:string
    private photo:string
}

export class Images {
    private id: number
    private url: string
    private elo: Elo
}

export class Videos {
    private id: number
    private url: string
    private elo: Elo
}

export class Likes {
    private id: number
    private elo: Elo
}

export class Comments {
    private id: number
    private content:string
    private elo: Elo
    
}