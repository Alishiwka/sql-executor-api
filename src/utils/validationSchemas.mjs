import { z } from "zod";

export const ExecuteSqlSchema = z.object({
  dbType: z.string({}).optional().default("postgres"),

  credentials: z.object({
    host: z
      .string({
        required_error: "Database host is required",
        invalid_type_error: "Host must be a string",
      })
      .default("localhost"),

    port: z
      .number({
        required_error: "Database port is required",
        invalid_type_error: "Port must be a number",
      })
      .int("Port must be an integer")
      .default(5432),

    user: z
      .string({
        required_error: "Database user is required",
        invalid_type_error: "Database user is required", 
      })
      .min(1, "Database user cannot be empty"),

    password: z
      .string({
        required_error: "Password is required",
        invalid_type_error: "Password is required",
      })
      .min(1, "Password cannot be empty"),

    database: z
      .string({
        required_error: "Database name is required",
        invalid_type_error: "Database name is required",
      })
      .min(1, "Database name cannot be empty"),
  }),

  query: z
    .string({
      required_error: "SQL query is required",
    })
    .trim()
    .min(10, "Query is too short (min 10 characters)"),
});
