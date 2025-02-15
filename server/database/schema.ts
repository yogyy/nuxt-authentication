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
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    avatar: text("avatar").notNull().default(""),
    createdAt: integer("created_at")
      .notNull()
      .default(sql`(current_timestamp)`),
  },
  (table) => [uniqueIndex("emailUniqueIndex").on(lower(table.email))]
);

export const sessions = sqliteTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
});
