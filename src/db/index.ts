import { drizzle } from "drizzle-orm/d1";
import * as schema from "@/db/schema";
import { getRequestContext } from "@cloudflare/next-on-pages";

function getDB() {
    if (process.env.NODE_ENV === "development") {
        const { env } = getRequestContext();
        return drizzle(env.DB, { schema });
    }
    // Production
    return drizzle(process.env.DB, { schema });
}

export const db = getDB();