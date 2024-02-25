import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { SignInUser } from "src/services/auth/signIn";

const handler = NextAuth({
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials) return null;

        const params = {
          username: credentials.username,
          password: credentials.password,
        };

        try {
          const response = await SignInUser(params);
          const user = {
            id: response.username,
            accessToken: response.accessToken,
          };
          return user;
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
