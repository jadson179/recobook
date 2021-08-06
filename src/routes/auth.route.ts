// deno-lint-ignore-file

import { Router } from 'https://deno.land/x/oak@v8.0.0/mod.ts'
import { sendMail, IRequestBody } from "https://deno.land/x/sendgrid@0.0.3/mod.ts";

import User from  '../model/user.model.ts'

import {
    find_user_by_username_and_password,
    find_user_by_email
} from '../service/user.service.ts'
import {createToken} from '../utils/token.ts'
import {SENDGRID_EMAIL,SENDGRID_TOKEN} from '../const.ts'


const routes = new Router()

routes.post('/auth',async ({request,response})=>{
    const userData = await request.body().value as User
    const  {error,message,status,user} = await find_user_by_username_and_password(userData)
    let  token = ""

    if (user)
        token = await createToken<User>(user,"user")

    response.status = status
    response.body = {
        error,
        message,
        user,
        token
    }
})

routes.post('/auth/forgot_password',async ({request,response})=>{
    const data = await request.body().value as User
    const  {error,message,status,user} = await find_user_by_email(data)
    
    if(user != null){
        let mail: IRequestBody = {
            personalizations: [
            {
                subject: "Quero minha Senha",
                to: [{ name: `${user.name}`, email: `${user.email}` }],
            },
            ],
            from: { email: SENDGRID_EMAIL },
            content: [
            { type: "text/plain", value: `Equipe recobook \n\n\nSegue sua senha em nossa plataforma :)\n\n ${user.password}` },
            { type: "text/html", value: `<p>Equipe recobook \n\n\nSegue sua senha em nossa plataforma :)\n\n ${user.password}</p>` },
            ],
        };
        
      const {errors} = await sendMail(mail, { apiKey: SENDGRID_TOKEN });
      console.log(errors)
    }

    response.status = status
    response.body = {
        error,
        message
    }
})

export default routes