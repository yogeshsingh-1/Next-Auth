// import { NextResponse,NextRequest } from "next/server";
// export function GET() {
//   return NextResponse.json({ message: "Hi from Yogesh backend developer" });
// }
// type Params = {
// abc : {
//         route : string[]
//     }
// }
// export async function GET(req:NextRequest,{params} : Params){
//     console.log("hello",params.route);
//     return NextResponse.json({mess : "he"})
// }
// type Param ={
//     params : {
//         route : string[]
//     }
// }
// export async function GET(req : NextRequest,context :Param){
//     // const {route}= context;
//     console.log(context)
//     return NextResponse.json("hhhvvvvvvv")
// }

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentails",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials: any) {
        const email = credentials.email;
        const password = credentials.password;
        return { email: email, password: password };
      },
    }),
  ],
  callbacks : {
    // block user with email
    signIn : ((user)=>{
        if(user?.email === "a@agmail.com"){
            return false
        }
        return true
    })

    // add inside token name and type
    jwt : ({token,user})=>{
        token.name ="abc";
        token.type = "admin"
        return token
    },
    // for get id of the user 
    session : ({session,token,user}:any){
        if(session && session.user){
            session.user.id = token.userId;
        }
        return session;
    }
  }
});
// export const GET = handler;
// export const POST =handler;
export { handler as GET, handler as POST };
