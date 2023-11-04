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

export const genders = ["male", "female", "other"] as const;
export type genders = (typeof genders)[number];

export const years = ["I", "II", "III", "IV"] as const;
export type years = (typeof years)[number];

export const users = pgTable("user", {
  id: serial("id").notNull().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  userSlug: text("userSlug").notNull().unique(),
  gender: text("gender", { enum: genders }).notNull(),
  college: text("college").notNull(),
  year: text("year", { enum: years }).notNull(),
  department: text("department").notNull(),
  contact: text("contact").notNull(),
  paymentScreenshotUrl: text("paymentScreenshotUrl").unique(),
  isFoodIssued: boolean("isFoodIssued").$default(() => false),
  ispaid: boolean("isPaid").$default(() => false),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
});
export type users = typeof users.$inferSelect;

export const insertUserSchema = createInsertSchema(users);

const eventsList = [
  // technical
  "pa_pre_trix",
  "dom_masters",
  "Just_a_terminal",
  "coding_chess",
  "code_decode",
  "relay_code",
  // non technical
  "xox",
  "jill_junk_juk",
  "free_fire",
  "bgmi",
  "connexion",
  "gully_cricket",
  "lazer_maze",
] as const;
export const parsedEvents = {
  technical: eventsList.slice(0, 6),
  nonTechnical: eventsList.slice(6),
};
export const events = pgEnum("events", eventsList);
export type events = (typeof events.enumValues)[number];

export const platforms = pgEnum("platforms", ["School", "College"]);
export type platforms = (typeof platforms.enumValues)[number];

export const departments = [
  "CSE",
  "IT",
  "AI-DS",
  "ECE",
  "CSBS",
  "EEE",
  "MECH",
  "AGRI",
  "BIO-TECH",
  "CIVIL",
] as const;
export type departments = (typeof departments)[number];

export const registrations = pgTable(
  "registration",
  {
    userId: integer("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    event: events("event").notNull(),
    createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  },
  (self) => ({
    compoundKey: primaryKey(self.userId, self.event),
  }),
);

export const insertRegistrationSchema = createInsertSchema(registrations);

export const idSchema = z.number().int();
