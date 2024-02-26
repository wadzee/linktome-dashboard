import "next-auth";

declare module "next-auth" {
  interface JWT {
    id: string;
    accessToken: string;
  }

  interface Session {
    user: any;
  }
}
