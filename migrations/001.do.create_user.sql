CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "username" TEXT NOT NULL UNIQUE,
  "emailAddress" TEXT NOT NULL,
  "password" TEXT NOT NULL
);
