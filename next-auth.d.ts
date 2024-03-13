import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    idToken: string;
    accessToken: string;
    isAdmin: boolean;
    username: string;
  }

  interface Session extends DefaultSession {
    user?: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    idToken: string;
    accessToken: string;
    isAdmin: boolean;
    username: string;
  }
}
