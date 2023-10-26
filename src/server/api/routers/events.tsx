import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

import {
  eventTypes,
  events,
  insertEventsSchema,
  platforms,
} from "@/server/db/schema";
import { and, eq } from "drizzle-orm";

export const eventsRouter = createTRPCRouter({
  getEvents: publicProcedure
    .input(
      z
        .object({
          type: z.enum(eventTypes).optional(),
          platform: z.enum(platforms).optional(),
        })
        .default({}),
    )
    .query(async ({ input: { type, platform }, ctx: { db } }) => {
      let condition;
      if (type !== undefined && platform !== undefined) {
        condition = and(eq(events.type, type), eq(events.platform, platform));
      } else if (type !== undefined) {
        condition = eq(events.type, type);
      } else if (platform !== undefined) {
        condition = eq(events.platform, platform);
      }

      return await db.query.events.findMany({ where: condition });
    }),
  getEventById: publicProcedure
    .input(
      z.object({
        id: z.number().int(),
      }),
    )
    .query(async ({ input: { id }, ctx: { db } }) => {
      return await db.query.events.findFirst({ where: eq(events.id, id) });
    }),
  createEvent: protectedProcedure
    .input(insertEventsSchema)
    .mutation(async ({ input, ctx: { db } }) => {
      await db.insert(events).values(input).execute();
    }),
});
