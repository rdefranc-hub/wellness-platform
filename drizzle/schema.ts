import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Wellness Platform Tables

/**
 * Avatares de IA disponíveis para atendimento
 */
export const avatars = mysqlTable("avatars", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  specialty: varchar("specialty", { length: 100 }).notNull(),
  description: text("description"),
  imageUrl: varchar("imageUrl", { length: 500 }),
  systemPrompt: text("systemPrompt").notNull(),
  available: mysqlEnum("available", ["true", "false"]).default("true").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Avatar = typeof avatars.$inferSelect;
export type InsertAvatar = typeof avatars.$inferInsert;

/**
 * Sessões de atendimento entre usuários e avatares
 */
export const sessions = mysqlTable("sessions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  avatarId: int("avatarId").notNull().references(() => avatars.id),
  startedAt: timestamp("startedAt").defaultNow().notNull(),
  endedAt: timestamp("endedAt"),
  status: mysqlEnum("status", ["active", "completed", "cancelled"]).default("active").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Session = typeof sessions.$inferSelect;
export type InsertSession = typeof sessions.$inferInsert;

/**
 * Mensagens trocadas durante as sessões
 */
export const messages = mysqlTable("messages", {
  id: int("id").autoincrement().primaryKey(),
  sessionId: int("sessionId").notNull().references(() => sessions.id),
  role: mysqlEnum("role", ["user", "assistant", "system"]).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Message = typeof messages.$inferSelect;
export type InsertMessage = typeof messages.$inferInsert;