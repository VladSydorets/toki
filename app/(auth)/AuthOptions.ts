import prisma from "@/lib/db";
import { type NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.password) {
          return null;
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email ?? undefined,
          name:
            user.firstName || user.lastName
              ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
              : undefined,
          image: user.avatar ?? undefined,
          firstName: user.firstName ?? undefined,
          lastName: user.lastName ?? undefined,
          avatar: user.avatar ?? undefined,
          role: user.role,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/logout",
    newUser: "/register",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google" && profile) {
        const googleProfile = profile as {
          name?: string;
          picture?: string;
        } | null;
        if (googleProfile?.name) {
          const nameParts = googleProfile.name.split(" ");
          user.firstName = nameParts[0];
          user.lastName = nameParts.slice(1).join(" ") || "";
        }
        if (googleProfile?.picture) {
          user.avatar = googleProfile.picture;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        token.provider = account.provider;
      }
      if (!token.exp) {
        token.exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24;
      }
      if (user) {
        token.id = user.id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.avatar = user.avatar;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      return {
        ...session,
        user: {
          id: token.id || token.sub,
          email: token.email,
          firstName: token.firstName,
          lastName: token.lastName,
          avatar: token.avatar,
          role: token.role,
        },
      };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
};

export default NextAuth(authOptions);
