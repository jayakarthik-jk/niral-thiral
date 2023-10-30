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
        .returning({ id: users.id, userSlug: users.userSlug });
      if (!user[0]) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
      return user[0];
    }),
  getUserBySlug: publicProcedure
    .input(z.object({ userSlug: z.string() }))
    .query(async ({ input: { userSlug }, ctx: { db } }) => {
      const user = await db.query.users.findFirst({
        where: eq(users.userSlug, userSlug),
      });
      return user ?? null;
    }),
  getUserById: publicProcedure
    .input(z.object({ userId: idSchema.optional() }))
    .query(async ({ input: { userId }, ctx: { db } }) => {
      if (!userId) {
        return null;
      }
      const user = await db.query.users.findFirst({
        where: eq(users.id, userId),
      });
      return user ?? null;
    }),

  getFoodIssuedStatus: publicProcedure
    .input(z.object({ userId: idSchema }))
    .query(async ({ input: { userId }, ctx: { db } }) => {
      const user = await db.query.users.findFirst({
        where: eq(users.id, userId),
        columns: {
          isFoodIssued: true,
        },
      });
      return user ?? null;
    }),
  updateFoodIssuedStatus: publicProcedure
    .input(z.object({ userId: idSchema }))
    .mutation(async ({ input: { userId }, ctx: { db } }) => {
      await db
        .update(users)
        .set({ isFoodIssued: true })
        .where(eq(users.id, userId));
    }),

  updatePaymentStatus: publicProcedure
    .input(z.object({ userId: idSchema }))
    .mutation(async ({ input: { userId }, ctx: { db } }) => {
      await db.update(users).set({ ispaid: true }).where(eq(users.id, userId));
    }),
});
