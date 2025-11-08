import { z } from "zod";
import { router, protectedProcedure } from "../_core/trpc";
import { invokeLLM, Message as LLMMessage } from "../_core/llm";
import {
  createSession,
  getSessionById,
  addMessage,
  getSessionMessages,
  endSession,
  getAvatarById,
} from "../wellness-db";

/**
 * Router para funcionalidades de chat com avatares de IA
 */
export const chatRouter = router({
  /**
   * Inicia uma nova sessão de chat com um avatar
   */
  startSession: protectedProcedure
    .input(
      z.object({
        avatarId: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { avatarId } = input;
      const userId = ctx.user.id;

      // Verificar se avatar existe
      const avatar = await getAvatarById(avatarId);
      if (!avatar) {
        throw new Error("Avatar não encontrado");
      }

      if (avatar.available !== "true") {
        throw new Error("Avatar indisponível no momento");
      }

      // Criar nova sessão
      const sessionId = await createSession({
        userId,
        avatarId,
        status: "active",
      });

      // Adicionar mensagem de sistema com o prompt do avatar
      await addMessage({
        sessionId,
        role: "system",
        content: avatar.systemPrompt,
      });

      return {
        sessionId,
        avatar: {
          id: avatar.id,
          name: avatar.name,
          specialty: avatar.specialty,
          description: avatar.description,
          imageUrl: avatar.imageUrl,
        },
      };
    }),

  /**
   * Envia uma mensagem e recebe resposta do avatar
   */
  sendMessage: protectedProcedure
    .input(
      z.object({
        sessionId: z.number(),
        message: z.string().min(1).max(5000),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { sessionId, message } = input;
      const userId = ctx.user.id;

      // Verificar se sessão existe e pertence ao usuário
      const session = await getSessionById(sessionId);
      if (!session) {
        throw new Error("Sessão não encontrada");
      }

      if (session.userId !== userId) {
        throw new Error("Acesso negado a esta sessão");
      }

      if (session.status !== "active") {
        throw new Error("Sessão não está ativa");
      }

      // Salvar mensagem do usuário
      await addMessage({
        sessionId,
        role: "user",
        content: message,
      });

      // Buscar histórico de mensagens
      const history = await getSessionMessages(sessionId);

      // Converter para formato do LLM
      const llmMessages: LLMMessage[] = history.map((msg) => ({
        role: msg.role as "system" | "user" | "assistant",
        content: msg.content,
      }));

      // Invocar LLM
      const response = await invokeLLM({
        messages: llmMessages,
      });

      const assistantMessage = response.choices[0].message.content;

      if (typeof assistantMessage !== "string") {
        throw new Error("Resposta inválida do LLM");
      }

      // Salvar resposta do assistente
      await addMessage({
        sessionId,
        role: "assistant",
        content: assistantMessage,
      });

      return {
        message: assistantMessage,
        usage: response.usage,
      };
    }),

  /**
   * Busca histórico de mensagens de uma sessão
   */
  getHistory: protectedProcedure
    .input(
      z.object({
        sessionId: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { sessionId } = input;
      const userId = ctx.user.id;

      // Verificar se sessão pertence ao usuário
      const session = await getSessionById(sessionId);
      if (!session) {
        throw new Error("Sessão não encontrada");
      }

      if (session.userId !== userId) {
        throw new Error("Acesso negado a esta sessão");
      }

      // Buscar mensagens (exceto system)
      const allMessages = await getSessionMessages(sessionId);
      const userMessages = allMessages.filter((msg) => msg.role !== "system");

      return {
        messages: userMessages.map((msg) => ({
          id: msg.id,
          role: msg.role,
          content: msg.content,
          createdAt: msg.createdAt,
        })),
      };
    }),

  /**
   * Finaliza uma sessão de chat
   */
  endSession: protectedProcedure
    .input(
      z.object({
        sessionId: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { sessionId } = input;
      const userId = ctx.user.id;

      // Verificar se sessão pertence ao usuário
      const session = await getSessionById(sessionId);
      if (!session) {
        throw new Error("Sessão não encontrada");
      }

      if (session.userId !== userId) {
        throw new Error("Acesso negado a esta sessão");
      }

      await endSession(sessionId);

      return {
        success: true,
      };
    }),
});
