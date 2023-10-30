import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

import {
  eventTypes,
  events,
  insertEventSchema,
  platforms,
} from "@/server/db/schema";
import { and, eq } from "drizzle-orm";

export const eventsRouter = createTRPCRouter({
  getEvents: publicProcedure
    .input(
      z
        .object({
          type: z.enum(eventTypes.enumValues).optional(),
          platform: z.enum(platforms.enumValues).optional(),
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
      const event = await db.query.events.findFirst({
        where: eq(events.id, id),
      });
      return event ?? null;
    }),
  createEvent: protectedProcedure
    .input(insertEventSchema)
    .mutation(async ({ input, ctx: { db } }) => {
      await db.insert(events).values(input);
    }),
});
