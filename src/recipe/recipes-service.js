const INGREDIENT_REGEX = /([a-z]|[A-Z])+/;

const recipesService = {

  getRecipesBySearch(db, searchTerm){
    return db("recipes")
      .select("*")
      .where()
  },
  getRecipesByIngredientsSearch(db, searchTerm) {
    const query = db("recipes")
      .select("*")
      .innerJoin("recipe_ingredients", "recipe_ingredients.recipe_id", "recipes.id")
      .innerJoin("ingredients", "ingredients.id", "recipe_ingredients.ingredient_id")
      .where({
        "ingredients.ingredient_name": searchTerm.toLowerCase(),
      });
    console.log(query.toString());
    return query;
  },  
  getAllRecipes(db, user_id) {
    return db("recipes")
      .select("*")
      .where("recipe_owner", user_id);
  },
  getAllByUser(db, users) {
    return db("recipes")
      .select("*")
      .where("owner", users);
  },
  getRecipeById(db, id) {
    return db("recipes")
      .select("*")
      .where("id", id)
      .first();
  },
  getRecipeOwnerData(db, owner) {
    return db("users")
      .where("owner", owner)
      .first();
  },
  insertRecipe(db, newRecipe) {
    return db
      .insert(newRecipe)
      .into("recipes")
      .returning("*")
      .then(rows => {
        return rows[0];
      });
  },

  addRecipeIngredient(db, ingredient) {
    return db
      .insert(ingredient)
      .into("recipe_ingredients")
      .returning("*")
      .then(rows => {
        return rows[0];
      });
  },
  deleteRecipeIngredient(db, recipe_id) {
    return db("recipe_ingredients")
      .where({ recipe_id })
      .delete();
  },

  getRecipeIngredientsId(db, recipe_id) {
    return db("recipe_ingredients")
      .select("ingredient_id")
      .where({ recipe_id });
  },

  deleteRecipe(db, id) {
    return db("recipes")
      .where({ id })
      .delete();
  },
  updateRecipe(db, updatedRecipeId, recipeId) {
    return db("recipes")
      .where({ id: recipeId })
      .update(updatedRecipeId)
      .returning("*");
  },
  isValidTitleInput(title) {
    if (title === "") {
      return false;
    }
    return true;
  },
  isValidDescriptionInput(descriptionArr) {
    for (let i = 0; i < descriptionArr.length; ++i) {

      let description = descriptionArr[i];
      description = description.trim();

      if (description === "") {
        return false;
      }
    }
    return true;
  },
  isValidIngredientsInput(ingredients) {
    for (let i = 0; i < ingredients.length; ++i) {
      let ingredient = ingredients[i];
      ingredient = ingredient.trim();
      if (ingredient === "") {
        return false;
      }
    }
    return true;
  }
};

module.exports = recipesService;




// SELECT * from recipes INNER JOIN 
// recipe_ingredients ON 
// recipe_ingredients.recipe_id = 
// recipes.id INNER HOIN ingredients 
// ON ingredients.id = 
// recipe_ingredients.ingredient_id 
// WHERE ingredients.ingredient_name = 'kale';