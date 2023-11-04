import { events, idSchema, registrations, users } from "@/server/db/schema";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { RegistrationErrors } from "@/utils/errors";

export const registrationRouter = createTRPCRouter({
  register: publicProcedure
    .input(z.object({ userId: idSchema, event: z.enum(events.enumValues) }))
    .mutation(async ({ input, ctx: { db } }) => {
      try {
        const user = await db.query.users.findFirst({
          where: eq(users.id, input.userId),
        });
        if (!user) {
          return RegistrationErrors.USER_DOES_NOT_EXIST;
        }
        if (!user.ispaid) {
          return RegistrationErrors.USER_DOES_NOT_PAID;
        }
        const usersRegistrations = await db
          .select()
          .from(registrations)
          .where(eq(registrations.userId, input.userId));
        const alreadyRegistered = usersRegistrations.some(
          (registration) => registration.event === input.event,
        );
        if (alreadyRegistered) {
          return RegistrationErrors.ALREADY_REGISTERED_IN_THIS_EVENT;
        }
        if (usersRegistrations.length >= 3) {
          return RegistrationErrors.CAN_NOT_REGISTER_MORE_THAN_3_EVENTS;
        }
        await db.insert(registrations).values(input);
      } catch (error) {
        return RegistrationErrors.SERVER_ERROR;
      }
    }),
  getRegistrationByEvent: publicProcedure
    .input(z.enum(events.enumValues))
    .query(async ({ input, ctx: { db } }) => {
      const result = await db
        .select()
        .from(registrations)
        .where(eq(registrations.event, input))
        .leftJoin(users, eq(users.id, registrations.userId));
      return result;
    }),
});
