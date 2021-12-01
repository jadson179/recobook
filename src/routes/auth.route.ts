// deno-lint-ignore-file

import { Router } from 'https://deno.land/x/oak@v8.0.0/mod.ts'
import { SmtpClient } from "https://deno.land/x/smtp/mod.ts";

import User from  '../model/user.model.ts'

import {
    find_user_by_username_and_password,
    find_user_by_email
} from '../service/user.service.ts'
import {createToken} from '../utils/token.ts'
import {GMAIL_PASSWORD,GMAIL_EMAIL} from '../const.ts'


const routes = new Router()

routes.post('/auth',async ({request,response})=>{
    try {

    const userData = await request.body().value as User
    const  {error,message,status,user} = await find_user_by_username_and_password(userData)
    let  token = ""

    if (user)
        token = await createToken<User>(user,"user")

    response.status = status
    response.body = {error,message,user,token}

    } catch (error) {
    response.status = 401
    response.body = {error: true,message: error.message,user: null,token: ""}
    }  
    
    
})

routes.post('/auth/forgot_password',async ({request,response})=>{
    const data = await request.body().value as User
    const  {error,message,status,user} = await find_user_by_email(data)
    
    if(user != null){
        
        console.log(GMAIL_EMAIL,GMAIL_PASSWORD)
        const client = new SmtpClient();

        await client.connectTLS({
            hostname: "smtp.gmail.com",
            port: 465,
            username: GMAIL_EMAIL,
            password: GMAIL_PASSWORD,
          });
          
          await client.send({
            from: GMAIL_EMAIL, 
            to: `${user.email}`, 
            subject: "Quero minha Senha",
            content: `Equipe recobook \n\n\nSegue sua senha em nossa plataforma :)\n\n ${user.password}`,
          });

        await client.close();    
    }

    response.status = status
    response.body = {
        error,
        message
    }
})

export default routes