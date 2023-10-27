import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

import { insertTeamsSchema, members, teams, users } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const teamsRouter = createTRPCRouter({
  getMyTeams: publicProcedure
    .input(z.object({ userId: z.number().int() }))
    .query(async ({ input: { userId }, ctx: { db } }) => {
      const result = await db
        .select()
        .from(members)
        .where(eq(members.userId, userId))
        .innerJoin(teams, eq(teams.id, members.teamId))
        .innerJoin(users, eq(members.userId, users.id))
        .execute();

      return result;
    }),
  createTeam: publicProcedure
    .input(
      insertTeamsSchema.merge(
        z.object({
          memberIds: z.array(z.number().int()).min(1).max(3),
        }),
      ),
    )
    .mutation(async ({ input, ctx: { db } }) => {
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
    }),
});
