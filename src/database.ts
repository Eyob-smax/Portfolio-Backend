import { PrismaPg } from "@prisma/adapter-pg";
import { required } from "./env.js";
import { PrismaClient } from "./generated/prisma/client.js";

/*
 * `required` rather than a template literal: interpolating a missing variable
 * produced the connection string "undefined", which Postgres rejects much
 * later with an error that names neither the variable nor this file.
 */
const adapter = new PrismaPg({ connectionString: required("DATABASE_URL") });

export const prisma = new PrismaClient({ adapter });
