export const isValidQuery = (req, res, next) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({
      success: false,
      error: "No query provided",
    });
  }

  const forbiddenWords = [
    "insert",
    "update",
    "delete",
    "drop",
    "truncate",
    "alter",
    "create",
  ];

  const cleanQuery = query.trim().toLowerCase();
  const isSelect = cleanQuery.startsWith("select");

  const containsForbidden = forbiddenWords.some((word) =>
    cleanQuery.includes(word),
  );

  if (!isSelect || containsForbidden) {
    return res.status(403).json({
      success: false,
      error: "Forbidden! Only SELECT queries are allowed.",
    });
  }

  next();
};

export const syntaxErrorHandler = (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      success: false,
      error: "Invalid JSON payload",
    });
  }

  next();
};
