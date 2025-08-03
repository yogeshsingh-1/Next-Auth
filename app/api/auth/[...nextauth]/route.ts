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
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials: any) {
        const { email, password } = credentials;

        // TODO: Replace this with your real DB/auth check
        if (email && password) {
          return { id: "user1", email };
        }

        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (user?.email === "a@agmail.com") return false;
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.name = "abc";
        token.type = "admin";
        token.userId = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.userId;
        session.user.type = token.type;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
export { handler as GET, handler as POST };
