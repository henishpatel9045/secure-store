import { prisma } from "@/db";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

const handler = NextAuth({
  // adapter: PrismaAdapter(prismaClient),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    // EmailProvider({
    //   server: {
    //     host: process.env.EMAIL_SERVER_HOST,
    //     port: process.env.EMAIL_SERVER_PORT,
    //     auth: {
    //       user: process.env.EMAIL_SERVER_USER ?? "<EMAIL>",
    //       pass: process.env.EMAIL_SERVER_PASSWORD,
    //     },
    //   },
    //   from: process.env.EMAIL_FROM,
    // }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // const accountId = account?.providerAccountId ?? "";
      // const name = user?.name ?? "";
      // if (!(user && user.email)) return false;

      // await prisma.user.upsert({
      //   where: {
      //     email: user.email ?? "",
      //   },
      //   update: {
      //     name,
      //     googleId: accountId,
      //   },
      //   create: {
      //     email: user.email,
      //     name,
      //     googleId: accountId,
      //   },
      // });

      return true;
    },
  },
  secret: process.env.SECRET ?? "db24d5bada6b34ee55d1a0dd888ff9f0",
});

export { handler as GET, handler as POST };
