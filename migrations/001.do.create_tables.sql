DROP TABLE IF EXISTS recipe_ingredients;
DROP TABLE IF EXISTS ingredients;
DROP TABLE IF EXISTS recipes;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  emailAddress TEXT NOT NULL,
  password TEXT NOT NULL,
  date_created TIMESTAMPTZ NOT NULL DEFAULT now()
);

create table recipes (
    id INTEGER primary key generated by default as identity,
    title TEXT NOT NULL,
    image_url TEXT, 
    ingredients TEXT [] NOT NULL,
    instructions TEXT [] NOT NULL,
    macro TEXT,
    mealType TEXT,
    cuisineType TEXT,     
    nutrient_info TEXT,
    source_url TEXT,
    recipe_owner INTEGER REFERENCES users(id) ON DELETE CASCADE 
);

DROP TYPE IF EXISTS stock;
CREATE TYPE stock AS ENUM ('in-stock', 'out-of-stock', 'low');

CREATE TABLE ingredients (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  ingredient_name TEXT NOT NULL,
  in_stock stock,
  notes TEXT,
  ingredient_owner INTEGER REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE recipe_ingredients (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  recipe_id INTEGER REFERENCES recipes(id) ON DELETE CASCADE NOT NULL,
  ingredient_id INTEGER REFERENCES ingredients(id) ON DELETE CASCADE NOT NULL
);
