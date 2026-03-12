
# 🚀 SQL Guard Executor

A secure and robust Node.js REST API designed to safely execute PostgreSQL queries. This project features strict schema validation, "human-friendly" error reporting, and custom security middleware to prevent destructive database operations.

## ✨ Key Features

- **Strict Validation:** Powered by **Zod** to ensure all incoming data (credentials and queries) is correctly formatted.
- **Friendly Errors:** Integrated with `zod-validation-error` to provide readable feedback (e.g., `✖ User is required at credentials.user`).
- **Dynamic Connections:** Ability to connect to any PostgreSQL instance by providing credentials directly in the request body.
- **Security Middleware:** Custom safety filter that allows **ONLY** `SELECT` statements and blocks forbidden keywords like `DROP`, `DELETE`, and `TRUNCATE`.
- **Error Handling:** Centralized handling for JSON syntax errors and database connection failures.

## 🛠 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database Driver:** `pg` (node-postgres)
- **Validation:** `zod` & `zod-validation-error`
- **Configuration:** `dotenv`

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone [https://github.com/your-username/sql-guard-executor.git](https://github.com/your-username/sql-guard-executor.git)
cd sql-guard-executor

```

### 2. Install dependencies

```bash
npm install

```

### 3. Setup Environment

Create a `.env` file in the root directory:

```text
PORT=3000

```

### 4. Run the server

```bash
npm start

```

## 📖 API Reference

### Execute SQL Query

Connects to a database and runs a validated SELECT query.

* **URL:** `/api/execute-sql`
* **Method:** `POST`
* **Content-Type:** `application/json`

#### Request Body Example:

```json
{
  "dbType": "postgres",
  "credentials": {
    "host": "localhost",
    "port": 5432,
    "user": "postgres",
    "password": "your_password",
    "database": "main_project"
  },
  "query": "SELECT * FROM products"
}

```

#### Successful Response:

```json
{
  "success": true,
  "data": [
    { "id": 1, "name": "Apple", "price": 100 },
    { "id": 2, "name": "Banana", "price": 50 }
  ]
}

```

#### Validation Error Example:

```json
{
  "success": false,
  "error": "Validation failed!",
  "details": "ValidationError: ✖ User is required at \"credentials.user\"; ✖ Query is too short at \"query\""
}

```

## 🛡 Security Rules

To protect your data, the API uses a **Read-Only** policy. The `isValidQuery` middleware blocks any request containing:

* `INSERT`, `UPDATE`, `DELETE`
* `DROP`, `TRUNCATE`, `ALTER`, `CREATE`

Attempts to use these commands will result in a `403 Forbidden` response.
