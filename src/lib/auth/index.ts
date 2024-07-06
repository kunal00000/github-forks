import NextAuth, { DefaultSession, NextAuthConfig, User } from "next-auth";
import { Provider } from "next-auth/providers";
import { getRequestContext } from "@cloudflare/next-on-pages";
import Github from "next-auth/providers/github";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db";
import { accounts, sessions, users, verificationTokens } from "@/db/schema";

declare module "next-auth" {
  interface Session {
    user: {
      seed?: string;
      accessToken?: string;
    } & DefaultSession["user"];
  }
  interface User {
    seed?: string;
    accessToken?: string;
  }
}

const authOptions = (): NextAuthConfig => {
  const cfEnv = getRequestContext().env;
  return {
    adapter: DrizzleAdapter(db, {
      usersTable: users,
      accountsTable: accounts,
      verificationTokensTable: verificationTokens,
      sessionsTable: sessions,
    }),
    secret: cfEnv.AUTH_SECRET,
    callbacks: {
      signIn({ user, account }) {
        const seed = seeds[Math.floor(Math.random() * (seeds.length - 1))];
        user.seed = seed;
        user.accessToken = account?.access_token;
        return true;
      },
      async session({ session, user }) {
        session.user.id = user.id;
        session.user.seed = user.seed;
        session.user.accessToken = user.accessToken;
        return session;
      },
    },
    providers: [
      Github({
        clientId: cfEnv.GITHUB_CLIENT_ID,
        clientSecret: cfEnv.GITHUB_CLIENT_SECRET,
      }) as Provider,
    ],
    trustHost: true,
  };
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);

const seeds = [
  "Salem",
  "Spooky",
  "Gizmo",
  "Peanut",
  "Loki",
  "Mittens",
  "Lily",
  "Gracie",
  "Tiger",
  "Sugar",
  "Lola",
  "Sammy",
  "Rascal",
  "Mimi",
  "Abby",
  "Maggie",
  "Garfield",
  "Kiki",
  "Jack",
  "Sheba",
  "Milo",
  "Angel",
  "Annie",
  "Pumpkin",
  "Leo",
  "Molly",
  "Samantha",
  "Sassy",
  "Chester",
  "Lucy",
  "Buster",
  "Pepper",
  "Midnight",
  "Patches",
  "Toby",
  "Miss kitty",
  "Socks",
  "Muffin",
  "Fluffy",
  "Smokey",
  "Nala",
  "Kitty",
  "Trouble",
  "Princess",
  "Chloe",
  "Casper",
  "Baby",
];
