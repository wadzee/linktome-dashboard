import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    idToken: string;
    accessToken: string;
    attributes: Array<{
      Name: "given_name" | "custom:isAdmin" | "custom:stripeId" | "sub";
      Value: string;
    }>;
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
    attributes: Array<{
      Name: "given_name" | "custom:isAdmin" | "custom:stripeId" | "sub";
      Value: string;
    }>;
  }
}
