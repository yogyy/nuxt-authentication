import { SQL, sql } from "drizzle-orm";
import {
  sqliteTable,
  text,
  integer,
  AnySQLiteColumn,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

export function lower(email: AnySQLiteColumn): SQL {
  return sql`lower(${email})`;
}

export const users = sqliteTable(
  "users",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    password: text("password"),
    avatar: text("avatar"),
    provider: text("provider", {
      enum: ["credentials", "google", "discord"],
    }).notNull(),
    providerId: text("provider_id"),
    createdAt: integer("created_at").default(sql`(current_timestamp)`),
  },
  (t) => [uniqueIndex("emailUniqueIndex").on(t.email, t.provider)]
);

export const sessions = sqliteTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
});
