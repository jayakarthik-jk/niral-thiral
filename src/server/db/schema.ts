import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  pgEnum,
  serial,
} from "drizzle-orm/pg-core";
import { type Account } from "next-auth";

import { createInsertSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<Account["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
  }),
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  }),
);

export const roles = pgEnum("role", ["USER", "COORDINATOR"]);

// ******************  Schema  ****************** //
export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  role: roles("roles").notNull().default("USER"),
  college: text("college"),
  year: integer("year"),
  department: text("department"),
  contact: text("contact"),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
});

export const userRelation = relations(users, ({ many }) => ({
  participatedTeams: many(teams),
}));

export const eventTypes = ["Technical", "NonTechnical"] as const;
export type eventTypes = (typeof eventTypes)[number];

export const platforms = ["School", "College"] as const;
export type platforms = (typeof platforms)[number];

export const teams = pgTable("team", {
  id: serial("id").notNull().primaryKey(),
  name: text("name"),
  slug: text("slug").notNull().unique(),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
});

export const teamsRelation = relations(teams, ({ many }) => ({
  members: many(users),
  registeredEvents: many(events),
}));

export const insertTeamsSchema = createInsertSchema(teams);

export const registrations = pgTable(
  "registration",
  {
    teamId: integer("teamId")
      .notNull()
      .references(() => teams.id, { onDelete: "cascade" }),
    eventId: integer("eventId")
      .notNull()
      .references(() => events.id, { onDelete: "cascade" }),
    createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  },
  (self) => ({
    compoundKey: primaryKey(self.eventId, self.teamId),
  }),
);
// export const insertRegistrationSchema = createInsertSchema(registrations);

export const members = pgTable(
  "member",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    teamId: integer("teamId")
      .notNull()
      .references(() => teams.id, { onDelete: "cascade" }),
  },
  (self) => ({
    compoundKey: primaryKey(self.teamId, self.userId),
  }),
);
// export const insertMembersSchema = createInsertSchema(members);

export const events = pgTable("event", {
  id: serial("id").notNull().primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  type: text("type", { enum: eventTypes }).notNull(),
  platform: text("platform", { enum: platforms }).notNull(),
  membersPerTeam: integer("membersPerTeam").default(3),

  // coordinators details
  coordinatorName: text("coordinatorName").notNull(),
  coordinatorContact: text("coordinatorContact").notNull(),
  coordinatorEmail: text("coordinatorEmail").notNull(),

  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
});

export const eventRelation = relations(events, ({ many }) => ({
  registeredTeams: many(teams),
}));

export const insertEventsSchema = createInsertSchema(events);
