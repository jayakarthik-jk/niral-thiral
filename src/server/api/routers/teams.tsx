import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

import { insertTeamsSchema, members, teams, users } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const teamsRouter = createTRPCRouter({
  getMyTeams: protectedProcedure.query(async ({ ctx: { db, session } }) => {
    const result = await db
      .select()
      .from(members)
      .where(eq(members.userId, session.user.id))
      .innerJoin(teams, eq(teams.id, members.teamId))
      .innerJoin(users, eq(members.userId, users.id))
      .execute();

    return result;
  }),
  createTeam: protectedProcedure
    .input(
      insertTeamsSchema.merge(
        z.object({
          memberIds: z.array(z.string().cuid()).max(2),
        }),
      ),
    )
    .mutation(
      async ({
        input,
        ctx: {
          db,
          session: { user },
        },
      }) => {
        input.memberIds.push(user.id);
        const team = await db
          .insert(teams)
          .values(input)
          .returning({ id: teams.id })
          .execute();
        if (team[0] !== undefined) {
          await db.insert(members).values(
            input.memberIds.map((memberId) => ({
              teamId: team[0]!.id,
              userId: memberId,
            })),
          );
        }
      },
    ),
});
