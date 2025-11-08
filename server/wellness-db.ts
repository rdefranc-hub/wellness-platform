import { eq, and, desc } from "drizzle-orm";
import { getDb } from "./db";
import {
  avatars,
  sessions,
  messages,
  InsertAvatar,
  InsertSession,
  InsertMessage,
  Avatar,
  Session,
  Message,
} from "../drizzle/schema";

// ==================== AVATARES ====================

/**
 * Busca todos os avatares disponíveis
 */
export async function getAllAvatars(): Promise<Avatar[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get avatars: database not available");
    return [];
  }

  const result = await db
    .select()
    .from(avatars)
    .where(eq(avatars.available, "true"))
    .orderBy(avatars.name);

  return result;
}

/**
 * Busca avatar por ID
 */
export async function getAvatarById(id: number): Promise<Avatar | undefined> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get avatar: database not available");
    return undefined;
  }

  const result = await db.select().from(avatars).where(eq(avatars.id, id)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

/**
 * Cria um novo avatar
 */
export async function createAvatar(avatar: InsertAvatar): Promise<number> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const result = await db.insert(avatars).values(avatar);
  return Number(result.insertId);
}

// ==================== SESSÕES ====================

/**
 * Cria uma nova sessão de atendimento
 */
export async function createSession(session: InsertSession): Promise<number> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const result = await db.insert(sessions).values(session);
  return Number(result.insertId);
}

/**
 * Busca sessão por ID
 */
export async function getSessionById(id: number): Promise<Session | undefined> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get session: database not available");
    return undefined;
  }

  const result = await db.select().from(sessions).where(eq(sessions.id, id)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

/**
 * Busca sessões ativas de um usuário
 */
export async function getUserActiveSessions(userId: number): Promise<Session[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get sessions: database not available");
    return [];
  }

  const result = await db
    .select()
    .from(sessions)
    .where(and(eq(sessions.userId, userId), eq(sessions.status, "active")))
    .orderBy(desc(sessions.startedAt));

  return result;
}

/**
 * Busca histórico de sessões de um usuário
 */
export async function getUserSessionHistory(userId: number): Promise<Session[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get session history: database not available");
    return [];
  }

  const result = await db
    .select()
    .from(sessions)
    .where(eq(sessions.userId, userId))
    .orderBy(desc(sessions.startedAt))
    .limit(50);

  return result;
}

/**
 * Finaliza uma sessão
 */
export async function endSession(sessionId: number): Promise<void> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db
    .update(sessions)
    .set({
      status: "completed",
      endedAt: new Date(),
    })
    .where(eq(sessions.id, sessionId));
}

// ==================== MENSAGENS ====================

/**
 * Adiciona uma mensagem a uma sessão
 */
export async function addMessage(message: InsertMessage): Promise<number> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const result = await db.insert(messages).values(message);
  return Number(result.insertId);
}

/**
 * Busca todas as mensagens de uma sessão
 */
export async function getSessionMessages(sessionId: number): Promise<Message[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get messages: database not available");
    return [];
  }

  const result = await db
    .select()
    .from(messages)
    .where(eq(messages.sessionId, sessionId))
    .orderBy(messages.createdAt);

  return result;
}

/**
 * Busca mensagens recentes de uma sessão (últimas N)
 */
export async function getRecentMessages(
  sessionId: number,
  limit: number = 50
): Promise<Message[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get messages: database not available");
    return [];
  }

  const result = await db
    .select()
    .from(messages)
    .where(eq(messages.sessionId, sessionId))
    .orderBy(desc(messages.createdAt))
    .limit(limit);

  // Reverter para ordem cronológica
  return result.reverse();
}
