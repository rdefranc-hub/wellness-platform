import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../_core/trpc";
import { getAllAvatars, getAvatarById, getUserSessionHistory } from "../wellness-db";

/**
 * Router para gerenciamento de avatares
 */
export const avatarsRouter = router({
  /**
   * Lista todos os avatares disponíveis (público)
   */
  list: publicProcedure.query(async () => {
    const avatars = await getAllAvatars();

    return {
      avatars: avatars.map((avatar) => ({
        id: avatar.id,
        name: avatar.name,
        specialty: avatar.specialty,
        description: avatar.description,
        imageUrl: avatar.imageUrl,
        available: avatar.available === "true",
      })),
    };
  }),

  /**
   * Busca detalhes de um avatar específico
   */
  getById: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async ({ input }) => {
      const avatar = await getAvatarById(input.id);

      if (!avatar) {
        throw new Error("Avatar não encontrado");
      }

      return {
        id: avatar.id,
        name: avatar.name,
        specialty: avatar.specialty,
        description: avatar.description,
        imageUrl: avatar.imageUrl,
        available: avatar.available === "true",
      };
    }),

  /**
   * Busca histórico de atendimentos do usuário
   */
  myHistory: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.user.id;
    const sessions = await getUserSessionHistory(userId);

    // Buscar informações dos avatares
    const sessionsWithAvatars = await Promise.all(
      sessions.map(async (session) => {
        const avatar = await getAvatarById(session.avatarId);

        return {
          id: session.id,
          startedAt: session.startedAt,
          endedAt: session.endedAt,
          status: session.status,
          avatar: avatar
            ? {
                id: avatar.id,
                name: avatar.name,
                specialty: avatar.specialty,
                imageUrl: avatar.imageUrl,
              }
            : null,
        };
      })
    );

    return {
      sessions: sessionsWithAvatars,
    };
  }),
});
