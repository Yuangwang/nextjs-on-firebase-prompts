"use server";
import { now } from "@/lib/utils";

export async function serverAction() {
  return `You used a server action, the current server timestamp is: ${now()}`;
}
