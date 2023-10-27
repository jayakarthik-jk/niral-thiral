import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  serial,
  boolean,
  pgEnum,
} from "drizzle-orm/pg-core";

import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */

// ******************  Schema  ****************** //

export const users = pgTable("user", {
  id: serial("id").notNull().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  gender: text("gender", { enum: ["male", "female", "other"] }).notNull(),
  college: text("college").notNull(),
  year: integer("year").notNull(),
  department: text("department").notNull(),
  contact: text("contact").notNull(),

  role: text("role", { enum: ["student", "faculty"] }).default("student"),
  foodIssued: boolean("foodIssued").$default(() => false),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(users);

export const eventTypes = pgEnum("eventTypes", ["Technical", "NonTechnical"]);
export type eventTypes = (typeof eventTypes.enumValues)[number];

export const platforms = pgEnum("platforms", ["School", "College"]);
export type platforms = (typeof platforms.enumValues)[number];

export const events = pgTable("event", {
  id: serial("id").notNull().primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  type: eventTypes("type").notNull(),
  platform: platforms("platform").notNull(),
  membersPerTeam: integer("membersPerTeam").default(3),

  // coordinators details
  coordinatorName: text("coordinatorName").notNull(),
  coordinatorContact: text("coordinatorContact").notNull(),
  coordinatorEmail: text("coordinatorEmail").notNull(),

  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
});

export const insertEventSchema = createInsertSchema(events);

export const registrations = pgTable(
  "registration",
  {
    userId: integer("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    eventId: integer("eventId")
      .notNull()
      .references(() => events.id, { onDelete: "cascade" }),
    createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  },
  (self) => ({
    compoundKey: primaryKey(self.eventId, self.userId),
  }),
);

export const insertRegistrationSchema = createInsertSchema(registrations);

export const idSchema = z.number().int();
