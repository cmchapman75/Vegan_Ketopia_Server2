const knex = require("knex");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");




/**
 * create a knex instance connected to postgres
 * @returns {knex instance}
 */
function makeKnexInstance() {
  return knex({
    client: "pg",
    connection: process.env.TEST_DATABASE_URL,
  });
}

/**
 * create a knex instance connected to postgres
 * @returns {array} of user objects
 */
function makeUsersArray() {
  return [
    {
      id: 1,
      username: "test-user-1",
      email_address: "Test user 1",
      password: "password",
    },
    {
      id: 2,
      username: "test-user-2",
      email_address: "Test user 2",
      password: "password",
    },
  ];
}

function makeIngredients() {
  return [
    {
      ingredient_name: "Test Ingredient 1",
      in_stock: "in-stock",
      notes: "Test notes 1",
      ingredient_owner: 1
    },
    {
      ingredient_name: "Test Ingredient 2",
      in_stock: "in-stock",
      notes: "Test notes 2",
      ingredient_owner: 1
    },
    {
      ingredient_name: "Test Ingredient 3",
      in_stock: "in-stock",
      notes: "Test notes 3",
      ingredient_owner: 2
    },
    {
      ingredient_name: "Test Ingredient 4",
      in_stock: "in-stock",
      notes: "Test notes 4",
      ingredient_owner: 2
    }
  ];
}

function makeRecipes() {
  return [
    {
      title: "Test Recipe 1",
      //recipe_ingredients: ["Test Ingredient 1", "Test Ingredient 2"],
      instructions: ["instruction 1.1", "instruction 1.2"],
    
      recipe_owner: 1,
    },
    {
      title: "Test Recipe 2",
      //recipe_ingredients: ["Test Ingredient 3", "Test Ingredient 4"],
      instructions: ["instruction 2.1", "instruction 2.2"],
      
      recipe_owner: 1,
    },
    {
      title: "Test Recipe 3",
      //recipe_ingredients: ["Test Ingredient 1", "Test Ingredient 2"],
      instructions: ["instruction 3.1", "instruction 3.2"],
      
      recipe_owner: 2,
    },
    {
      title: "Test Recipe 4",
      //recipe_ingredients: ["Test Ingredient 3", "Test Ingredient 4"],
      instructions: ["instruction 4.1", "instruction 4.2"],
      
      recipe_owner: 2,
    }
  ]
}


/**
 * make a bearer token with jwt for authorization header
 * @param {object} user - contains `id`, `username`
 * @param {string} secret - used to create the JWT
 * @returns {string} - for HTTP authorization header
 */
function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.username,
    algorithm: "HS256",
  });
  return `Bearer ${token}`;
}

/**
 * remove data from tables and reset sequences for SERIAL id fields
 * @param {knex instance} db
 * @returns {Promise} - when tables are cleared
 */
function cleanTables(db) {
  return db.transaction(trx =>
    trx.raw(
      `TRUNCATE
        "ingredients",
        "recipes",
        "users"
        `
    )
      .then(() =>
        Promise.all([
          trx.raw("ALTER SEQUENCE ingredients_id_seq minvalue 0 START WITH 0"),
          trx.raw("ALTER SEQUENCE recipes_id_seq minvalue 0 START WITH 0"),
          trx.raw("ALTER SEQUENCE users_id_seq minvalue 0 START WITH 0"),
          trx.raw("SELECT setval('ingredients_id_seq', 0)"),
          trx.raw("SELECT setval('recipes_id_seq', 0)"),
          trx.raw("SELECT setval('users_id_seq', 0)")
        ])
      )
  );
}

/**
 * insert users into db with bcrypted passwords and update sequence
 * @param {knex instance} db
 * @param {array} users - array of user objects for insertion
 * @returns {Promise} - when users table seeded
 */
async function seedUsers(db, users) {

  await db.transaction(async trx => {
    await trx.into("users").insert(users);
  });
}

/**
 * seed the databases with ingredients and update sequence counter
 * @param {knex instance} db
 * @param {array} users - array of user objects for insertion
 * @param {array} ingredients - array of ingredients objects for insertion
 * @returns {Promise} - when all tables seeded
 */
async function seedPantry(db, users, ingredients) {

  await db.transaction(async trx => {
    await trx.into("accounts").insert(users);
    await trx.into("ingredients").insert(ingredients);
  });
}

/**
* seed the databases with recipes and update sequence counter
* @param {knex instance} db
* @param {array} users - array of user objects for insertion
* @param {array} recipes - array of recipe objects for insertion
* @returns {Promise} - when all tables seeded
*/
async function seedRecipes(db, users, recipes, ingredients, recipeIngredients) {
  // await seedUsers(db, users);

  await db.transaction(async trx => {
    await trx.into("accounts").insert(users);
    await trx.into("recipes").insert(recipes);

  });



}




module.exports = {
  makeKnexInstance,
  makeUsersArray,
  makeRecipes,
  makeIngredients,
  makeAuthHeader,
  cleanTables,
  seedUsers,
  seedPantry,
  seedRecipes,

};
