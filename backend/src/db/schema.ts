import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const issues = pgTable("issues", {
  id: uuid("id")
    .defaultRandom()
    .primaryKey(),

  title: varchar("title", {
    length: 255,
  }).notNull(),

  description: text("description")
    .notNull(),

  status: varchar("status", {
    length: 50,
  })
    .default("OPEN")
    .notNull(),

  priority: varchar("priority", {
    length: 50,
  })
    .default("MEDIUM")
    .notNull(),

  analysis: text("analysis"),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull(),
});

export const discussions = pgTable("discussions", {
  id: uuid("id")
    .defaultRandom()
    .primaryKey(),

  issueId: uuid("issue_id")
    .references(() => issues.id, {
      onDelete: "cascade",
    })
    .notNull(),

  message: text("message")
    .notNull(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
});