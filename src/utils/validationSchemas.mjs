import { z } from "zod";

export const ExecuteSqlSchema = z.object({
  dbType: z.string({}).optional().default("postgres"),

  credentials: z.object({
    host: z
      .string({
        error: (iss) =>
          iss.input === undefined
            ? "Database host is required"
            : "Host must be a string",
      }),

    port: z
      .number({
        error: (iss) =>
          iss.input === undefined
            ? "Database port is required"
            : "Port must be a number",
      })
      .int("Port must be an integer"),

    user: z
      .string({
        error: "Database user is required",
      })
      .min(1, "Database user cannot be empty"),

    password: z
      .string({
        error: "Password is required",
      })
      .min(1, "Password cannot be empty"),

    database: z
      .string({
        error: "Database name is required",
      })
      .min(1, "Database name cannot be empty"),
  }),

  query: z
    .string({
      error: "SQL query is required"
    })
    .trim()
    .min(10, "Query is too short (min 10 characters)"),
});
