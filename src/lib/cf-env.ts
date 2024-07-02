import { getRequestContext } from '@cloudflare/next-on-pages';

export const env = () => {
  return {
    AUTH_SECRET: getRequestContext().env.AUTH_SECRET,
    NEXTAUTH_URL: getRequestContext().env.NEXTAUTH_URL,
    GITHUB_CLIENT_ID: getRequestContext().env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: getRequestContext().env.GITHUB_CLIENT_SECRET,
  };
};