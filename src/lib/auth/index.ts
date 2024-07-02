import NextAuth, { DefaultSession, NextAuthConfig } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { getDB } from "@/lib/cf";
import { Adapter } from "next-auth/adapters";
import { Provider } from "next-auth/providers";
import { getRequestContext } from "@cloudflare/next-on-pages";
import Github from "next-auth/providers/github";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      seed?: string;
    };
  }
}

const authOptions = (): NextAuthConfig => {
  const cfEnv = getRequestContext().env;
  return {
    adapter: PrismaAdapter(getDB(cfEnv)) as Adapter,
    secret: cfEnv.AUTH_SECRET,
    callbacks: {
      signIn({ user }) {
        // @ts-expect-error
        user.seed =
          avatarSeeds[Math.floor(Math.random() * (avatarSeeds.length - 1))];
        return true;
      },
      session: ({ session, user }) => {
        session.user.id = user.id;
        // @ts-expect-error
        session.user.seed = user.seed;
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

const avatarSeeds = [
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
