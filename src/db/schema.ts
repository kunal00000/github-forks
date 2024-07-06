import { text, integer, sqliteTableCreator, primaryKey, index } from 'drizzle-orm/sqlite-core';
import type { AdapterAccountType } from "next-auth/adapters";

export const createTable = sqliteTableCreator((name) => `${name}`);


export const accounts = createTable('account', 
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
}))

export const sessions = createTable('session', {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
});

export const users = createTable(
  "user",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: text("name"),
    email: text("email").notNull(),
    emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
    image: text("image"),
    seed: text("seed"),
    accessToken: text("accessToken"),
  },
  (user) => ({
    emailIdx: index("users_email_idx").on(user.email),
    idIdx: index("users_id_idx").on(user.id),
  })
);

export const verificationTokens = createTable('verificationToken',{
  identifier: text("identifier").notNull(),
  token: text("token").notNull(),
  expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
},
(verificationToken) => ({
  compositePk: primaryKey({
    columns: [verificationToken.identifier, verificationToken.token],
  }),
})
)

