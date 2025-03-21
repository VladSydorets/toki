import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    avatar?: string;
    role?: string;
  }

  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    avatar?: string;
    role?: string;
  }
}
