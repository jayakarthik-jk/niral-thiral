import { events, idSchema, registrations } from "@/server/db/schema";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

export const registrationRouter = createTRPCRouter({
  register: publicProcedure
    .input(z.object({ userId: idSchema, event: z.enum(events.enumValues) }))
    .mutation(async ({ input, ctx: { db } }) => {
      await db.insert(registrations).values(input);
    }),
});
