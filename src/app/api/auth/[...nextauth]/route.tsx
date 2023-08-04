import { prisma } from "@/db";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const accountId = account?.providerAccountId ?? "";
      const name = user?.name ?? "";
      if (!(user && user.email)) return false;

      await prisma.user.upsert({
        where: {
          email: user.email ?? "",
        },
        update: {
          name,
          googleId: accountId,
        },
        create: {
          email: user.email,
          name,
          googleId: accountId,
        },
      });

      return true;
    },
  },
});

export { handler as GET, handler as POST };
