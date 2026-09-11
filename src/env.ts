import dotenv from "dotenv";

/*
 * Loaded here and nowhere else.
 *
 * Every other module reads `process.env` at import time (the email transport is
 * built as a side effect of its own import, for instance), so the load has to
 * happen before any of them are evaluated. Importing this module first in the
 * entry point is what guarantees that — scattering `dotenv.config()` calls
 * through the modules that happen to need a variable makes the outcome depend
 * on import order, which is how `EMAIL_USER` ended up undefined.
 */
dotenv.config();

/** Reads a variable, or throws with a message naming what to set. */
export function required(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`${name} is not configured. Set it in your .env file.`);
  }
  return value;
}

/** Reads a variable, falling back when it is unset or blank. */
export function optional(name: string, fallback: string): string {
  return process.env[name]?.trim() || fallback;
}

export const PORT = Number(optional("PORT", "4000"));
