import { ClientConfig } from "https://deno.land/x/mysql@v2.9.0/mod.ts";
import { Schema } from "https://deno.land/x/valivar@v6.2.11/mod.ts"



export const SERVER_PORT = 8000;
export const DATABASE_HOST = "0.0.0.0";
export const DATABASE_USERNAME = "root";
export const DATABASE_PASSWORD = "root";
export const DATABASE_NAME = "core";
export const DATABASE_PORT = 3306;

export const CLIENT_DATABASE_CONFIG:ClientConfig = {
  hostname: DATABASE_HOST,
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  db: DATABASE_NAME,
  port: DATABASE_PORT,
  charset: "utf8"
}

export const SERVICE_AUTH_KEY = Deno.env.get("SERVICE_AUTH_KEY") as string 

export const MESSAGE_INTERNAL_SERVER_ERROR = "O servidor encontrou uma situação com a qual não sabe lidar"
export const MESSAGE_SUCESS_CREATE_USER = "Novo usuário criado com sucesso"
export const MESSAGE_USER_ALREADY_EXISTS_EMAIL = "Já existe um usuário com esse email"
export const MESSAGE_USER_ALREADY_EXISTS_USERNAME = "Já existe um usuário com esse username"
export const MESSAGE_SUCCESS_UPDATE_USER = "Usuário atualizado com sucesso"
export const MESSAGE_SUCCESS_DELETE_USER = "Usuário deletado com sucesso"
export const MESSAGE_SUCCESS_IN_FIND_USER = "Sucesso em encontrar usuario";
export const MESSAGE_FAILD_IN_FIND_USER = "Falhou em encontrar usuario, usuário ou senha estão errados"; 
export const MESSAGE_UNAUTHORIZED = "Não autorizado"



export const SCHEMA_CREATE_USER = new Schema({
  id: {type:Number,required: false,message: "id é obrigatório"},
  name: {type:String,required: true,message: "nome é obrigatório"},
  email: {type:String,required: true,message: "email é obrigatório"},
  username: {type:String,required: true,message: "nome de usuário é obrigatório"},
  password: {type:String,required: true,message: "senha é obrigatório"},
  photo: {type:String,required: true,message: "foto é obrigatório"},
  bio: {type:String,required: false}
}) 

export const SCHEMA_READ_USER_BY_USERNAME_AND_PASSWORD = new Schema({
  id: {type:Number,required: false,message: "id é obrigatório"},
  name: {type:String,required: false,message: "nome é obrigatório"},
  email: {type:String,required: false,message: "email é obrigatório"},
  username: {type:String,required: true,message: "nome de usuário é obrigatório"},
  password: {type:String,required: true,message: "senha é obrigatório"},
  photo: {type:String,required: false,message: "foto é obrigatório"},
  bio: {type:String,required: false}
}) 



export const SCHEMA_UPDATE_USER = new Schema({
  id: {type:Number,required: true,message: "id é obrigatório"},
  name: {type:String,required: true,message: "nome é obrigatório"},
  email: {type:String,required: true,message: "email é obrigatório"},
  username: {type:String,required: true,message: "nome de usuário é obrigatório"},
  password: {type:String,required: true,message: "senha é obrigatório"},
  photo: {type:String,required: true,message: "foto é obrigatório"},
  bio: {type:String,required: false}
}) 


export const SCHEMA_DELETE_USER_BY_ID = new Schema({
  id: {type:Number,required: true,message: "id é obrigatório"},
  name: {type:String,required: false,message: "nome é obrigatório"},
  email: {type:String,required: false,message: "email é obrigatório"},
  username: {type:String,required: false,message: "nome de usuário é obrigatório"},
  password: {type:String,required: false,message: "senha é obrigatório"},
  photo: {type:String,required: false,message: "foto é obrigatório"},
  bio: {type:String,required: false}
}) 

export const SCHEMA_DELETE_USER_BY_EMAIL = new Schema({
  id: {type:Number,required: false,message: "id é obrigatório"},
  name: {type:String,required: false,message: "nome é obrigatório"},
  email: {type:String,required: true,message: "email é obrigatório"},
  username: {type:String,required: false,message: "nome de usuário é obrigatório"},
  password: {type:String,required: false,message: "senha é obrigatório"},
  photo: {type:String,required: false,message: "foto é obrigatório"},
  bio: {type:String,required: false}
}) 

export const SCHEMA_DELETE_USER_BY_USERNAME = new Schema({
  id: {type:Number,required: false,message: "id é obrigatório"},
  name: {type:String,required: false,message: "nome é obrigatório"},
  email: {type:String,required: false,message: "email é obrigatório"},
  username: {type:String,required: true,message: "nome de usuário é obrigatório"},
  password: {type:String,required: false,message: "senha é obrigatório"},
  photo: {type:String,required: false,message: "foto é obrigatório"},
  bio: {type:String,required: false}
}) 


export const MESSAGE_SUCESS_CREATE_ELO = "Novo elo criado com sucesso"
export const MESSAGE_SUCESS_UPDATE_ELO = "Elo atualizado com sucesso"
export const MESSAGE_SUCCESS_DELETE_ELO = "ELo deletado com sucesso"
export const MESSAGE_SUCCESS_IN_FIND_ELO = "Sucesso em encontrar elo";
export const MESSAGE_FAILD_IN_FIND_ELO = "Falhou em encontrar elo"; 

export const SCHEMA_CREATE_ELO = new Schema({
  id: {type:Number,required: false,message: "id é obrigatório"},
  description: {type:String,required: true,message: "descrição é obrigatório"},
  category: {type:String,required: true,message: "categoria é obrigatório"},
  address: {type:String,required: true,message: "endereço é obrigatório"},
  qtd_likes: {type:Number,required: false},
  qtd_comments: {type:Number,required: false},
  id_user: {type:Number,required: true, message: "identificação de um usuário é obrigatório"}
}) 

export const SCHEMA_UPDATE_ELO = new Schema({
  id: {type:Number,required: true,message: "id é obrigatório"},
  description: {type:String,required: true,message: "descrição é obrigatório"},
  category: {type:String,required: true,message: "categoria é obrigatório"},
  address: {type:String,required: true,message: "endereço é obrigatório"},
  qtd_likes: {type:Number,required: false},
  qtd_comments: {type:Number,required: false},
  id_user: {type:Number,required: true, message: "identificação de um usuário é obrigatório"}
}) 

export const SCHEMA_DELETE_ELO_BY_ID = new Schema({
  id: {type:Number,required: true,message: "id é obrigatório"},
  description: {type:String,required: false,message: "descrição é obrigatório"},
  category: {type:String,required: false,message: "categoria é obrigatório"},
  address: {type:String,required: false,message: "endereço é obrigatório"},
  qtd_likes: {type:Number,required: false},
  qtd_comments: {type:Number,required: false},
  id_user: {type:Number,required: false, message: "identificação de um usuário é obrigatório"}
}) 

export const SCHEMA_FIND_ELO_BY_ID = new Schema({
  id: {type:Number,required: true,message: "id é obrigatório"},
  description: {type:String,required: false,message: "descrição é obrigatório"},
  category: {type:String,required: false,message: "categoria é obrigatório"},
  address: {type:String,required: false,message: "endereço é obrigatório"},
  qtd_likes: {type:Number,required: false},
  qtd_comments: {type:Number,required: false},
  id_user: {type:Number,required: false, message: "identificação de um usuário é obrigatório"}
})


export const MESSAGE_SUCESS_CREATE_IMAGE = "Nova imagem criada com sucesso"

export const SCHEMA_CREATE_IMAGE = new Schema({
  id: {type:Number,required: true,message: "id é obrigatório"},
  url: {type:String,required: true,message: "url é obrigatório"},
  id_user: {type:Number,required: true, message: "identificação de um usuário é obrigatório"}
}) 