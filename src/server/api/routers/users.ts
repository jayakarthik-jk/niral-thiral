import { idSchema, insertUserSchema, users } from "@/server/db/schema";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const usersRouter = createTRPCRouter({
  createUser: publicProcedure
    .input(insertUserSchema)
    .mutation(async ({ input, ctx: { db } }) => {
      const user = await db
        .insert(users)
        .values(input)
        .returning({ id: users.id });
      if (!user[0]?.id) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
      return user[0].id;
    }),
  getUserById: publicProcedure
    .input(z.object({ userId: idSchema }))
    .query(async ({ input: { userId }, ctx: { db } }) => {
      return await db.query.users.findFirst({
        where: eq(users.id, userId),
      });
    }),
  getUserByIdOrUndefined: publicProcedure
    .input(z.object({ userId: idSchema.optional() }))
    .query(async ({ input: { userId }, ctx: { db } }) => {
      if (!userId) {
        return null;
      }
      return await db.query.users.findFirst({
        where: eq(users.id, userId),
      });
    }),

  getFoodIssuedStatus: publicProcedure
    .input(z.object({ userId: idSchema }))
    .query(async ({ input: { userId }, ctx: { db } }) => {
      return await db.query.users.findFirst({
        where: eq(users.id, userId),
        columns: {
          foodIssued: true,
        },
      });
    }),
  updateFoodIssuedStatus: publicProcedure
    .input(z.object({ userId: idSchema }))
    .mutation(async ({ input: { userId }, ctx: { db } }) => {
      return await db
        .update(users)
        .set({ foodIssued: true })
        .where(eq(users.id, userId));
    }),
});
