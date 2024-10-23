import { prismaClient } from "@/lib/db";
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
        })
    ],
    secret: process.env.JWT_SECRET,
    callbacks: {
        async signIn(params) {
            if (!params.user.email) {
                return false;
            }
            try {
                await prismaClient.user.create({
                    data: {
                        email: params.user.email ?? "",
                        Provider: "Google"
                    }
                })
            }
            catch (e) {
                console.log(e);
                return false;
            }
            return true;
        }

    }
})

export { handler as GET, handler as POST }