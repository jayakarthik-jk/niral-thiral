import { idSchema, insertUserSchema, users } from "@/server/db/schema";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { eq } from "drizzle-orm";

export const usersRouter = createTRPCRouter({
  createUser: publicProcedure
    .input(insertUserSchema)
    .mutation(async ({ input, ctx: { db } }) => {
      return db.insert(users).values(input);
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
    .query(async ({ input: { userId }, ctx: { db } }) => {
      return await db
        .update(users)
        .set({ foodIssued: true })
        .where(eq(users.id, userId));
    }),
  isValidUser: publicProcedure
    .input(z.object({ userId: idSchema }))
    .query(async ({ input: { userId }, ctx: { db } }) => {
      return !!(await db.query.users.findFirst({
        where: eq(users.id, userId),
        columns: {},
      }));
    }),
});
