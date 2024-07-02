import { type Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema.ts",
  dialect: "sqlite",
  driver: "d1",
  dbCredentials: {
    wranglerConfigPath: "./wrangler.toml",
    dbName: "github-forks-d1",
  },
  out: "migrations",
} satisfies Config;