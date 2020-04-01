module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || "development",
  DATABASE_URL:
          process.env.DATABASE_URL ||
          "postgresql://dunder_mifflin:mypassword@localhost/vegan_ketopia",
  TEST_DATABASE_URL:
          process.env.TEST_DATABASE_URL ||
          "postgresql://dunder_mifflin:mypassword@localhost/vegan_ketopia_test",
  JWT_SECRET: process.env.JWT_SECRET || "vegan-keptoia-secret",
//   JWT_EXPIRY: process.env.JWT_EXPIRY || '12h',
};
      