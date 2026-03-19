import express from "express";
import 'dotenv/config';
import { Pool } from "pg";
import { ExecuteSqlSchema } from './src/utils/validationSchemas.mjs';
import { isValidQuery, syntaxErrorHandler } from './src/utils/helpers.mjs';
import { z } from "zod";
import { fromError } from 'zod-validation-error'; 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(syntaxErrorHandler);

app.post("/api/execute-sql", isValidQuery, async (req, res) => {
  const validation = ExecuteSqlSchema.safeParse(req.body);

if (!validation.success) {
    const pretty = fromError(validation.error).details.map((detail) => detail.message);

    return res.status(400).json({
      success: false,
      error: "Validation failed!",
      details: pretty,
    });
  }

  const { credentials, query } = validation.data;
  const pool = new Pool(credentials);
  try {
    const result = await pool.query(query);

    res.json({
      success: true,
      data: result.rows,
    });
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({
      success: false,
      error: "Error receiving data!",
    });
  } finally {
    pool.end();
  }
});

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
