import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { signInUser } from "src/services/auth/signIn";

const handler = NextAuth({
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 1 * 60 * 60, // 1 hour
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
          const response = await signInUser(params);
          const user = {
            id: response.id,
            username: response.username,
            idToken: response.idToken,
            accessToken: response.accessToken,
            isAdmin: response.isAdmin,
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
