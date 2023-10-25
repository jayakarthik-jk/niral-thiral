import { platforms } from "@/server/db/schema";

export function isValidPlatform(platform: string) {
  return Object.values(platforms).includes(platform as platforms);
}
