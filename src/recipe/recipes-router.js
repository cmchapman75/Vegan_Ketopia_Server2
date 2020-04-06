/* eslint-disable no-console */
const express = require("express");
const logger = require("../logger");
const recipesService = require("./recipes-service");
const pantryService = require("../pantry/pantry-service");
const AccountService = require("../users/users-service");
const requireAuth = require("../middleware/jwt-auth");
const xss = require("xss");
const path = require("path");

const bodyParser = express.json();
const recipeRouter = express.Router();

const serializeRecipe = recipe => {
  return {
    ...recipe
  };
};

recipeRouter
  .route("/search")
  .get(requireAuth, (req, res, next) => {
    const searchTerm = req.query.q;
    const meal_type = req.query.meal_type;
    const cuisine_type = req.query.cuisine_type;
    recipesService
      .getRecipesBySearch(req.app.get("db"), searchTerm)
      .then(recipes => {
        if(req.query.q) {
          const filterResults = recipes
            .filter(recipe => {
              if (!meal_type || meal_type.toLowerCase() === "all") {
                return true;
              } return (recipe.meal_type.toLowerCase() === meal_type.toLowerCase());
            })
            .filter(recipe => {if (!cuisine_type || cuisine_type.toLowerCase() === "all") {
              return true;
            } return (recipe.cuisine_type.toLowerCase() === cuisine_type.toLowerCase());
            });                   
          res.status(200).json(filterResults);
        }
      })
      .catch(err => {
        next(err);
      });
  });

recipeRouter
  .route("/")
  .get(requireAuth, (req, res, next) => {
    let user_id = req.user.id;
    recipesService
      .getAllRecipes(req.app.get("db"), user_id)
      .then(recipes => {
        res.status(200).json(recipes);
      })
      .catch(err => {
        next(err);
      });
  })  
  .post(requireAuth, bodyParser, (req, res, next) => {
    let {
      title,
      instructions,
      ingredients,
      meal_type,
      cuisine_type
    } = req.body;
    let recipe_owner = req.user.id;
    let recipeId = "";
    const newRecipe = {
      title,
      instructions,
      ingredients,
      meal_type, 
      cuisine_type,
      recipe_owner
    };

    title = title.trim();
    let isValidTitle = recipesService.isValidTitleInput(title);
    let isValidIngredients = recipesService.isValidIngredientsInput(ingredients);
    let isValidInstructions = recipesService.isValidInstructionsInput(instructions);
    
    if (!isValidTitle) {
      return res.status(400).json({ error: "Recipe title must only contain letters and cannot begin or end with spaces" });
    }
    if (!isValidIngredients) {
      return res.status(400).json({ error: "Recipe ingredients must only contain letters and cannot begin or end with spaces" });
    }
    if (!isValidInstructions) {
      return res.status(400).json({ error: "Recipe description cannot begin or end with spaces" });
    }

    for (const [key, value] of Object.entries(newRecipe)) {
      if (value === null) {
        return res.status(400).json({
          error: { message: `Missing ${key} in request body` }
        });
      }
    }
    recipesService
      .insertRecipe(req.app.get("db"), newRecipe)
      .then(recipe => {
        recipeId = recipe.id;
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${recipe.id}`))
          .json(serializeRecipe(recipe));
      })
      .then(() => {
        ingredients.map(ingredient => {
          let newIngredient = {
            ingredient_name: ingredient.toLowerCase(),
            in_stock: null,
            ingredient_owner: req.user.id
          };
          pantryService
            .checkIfExists(req.app.get("db"), newIngredient)
            .then(res => {

              if (!res[0]) {
                pantryService
                  .addIngredient(req.app.get("db"), newIngredient)
                  .then(ingredient => {
                    let recipeIngredient = {
                      recipe_id: recipeId,
                      ingredient_id: ingredient.id
                    };
                    recipesService.addRecipeIngredient(req.app.get("db"), recipeIngredient);
                  });
              }
              else {
                let recipeIngredient = {
                  recipe_id: recipeId,
                  ingredient_id: res[0].id,
                };
                recipesService.addRecipeIngredient(req.app.get("db"), recipeIngredient);
              }
            });
        });
      })
      .catch(err => {
        next(err);
      });

  });

recipeRouter
  .route("/:recipe_Id")
  .patch(requireAuth, bodyParser, (req, res, next) => {

    let { title, instructions,  ingredients } = req.body;
    let updatedRecipe = { title, instructions, ingredients };
    let recipeId = req.body.id;

    title = title.trim();

    let isValidTitle = recipesService.isValidTitleInput(title);
    let isValidIngredients = recipesService.isValidIngredientsInput(ingredients);
    let isValidInstructions = recipesService.isValidInstructionsnInput(instructions);


    if (!isValidTitle) {
      return res.status(400).json({ error: "Recipe title must only contain letters and cannot begin or end with spaces" });
    }
    if (!isValidIngredients) {
      return res.status(400).json({ error: "Recipe ingredients must only contain letters and cannot begin or end with spaces" });
    }
    if (!isValidInstructions) {
      return res.status(400).json({ error: "Recipe instructions cannot begin or end with spaces" });
    }
    recipesService
      .updateRecipe(req.app.get("db"), updatedRecipe, recipeId)
      .then(updatedRecipeResponse => {
        res.status(201).json({
          title: updatedRecipeResponse.title,
          recipe_description: updatedRecipeResponse.recipe_description,
          time_to_make: updatedRecipeResponse.time_to_make
        });
      }).catch(err => {
        next(err);
      });

    recipesService.deleteRecipeIngredient(req.app.get("db"), recipeId)
      .then(() => {
        ingredients.map(ingredient => {
          let newIngredient = {
            ingredient_name: ingredient.toLowerCase(),
            in_stock: null,
            ingredient_owner: req.user.id
          };
          pantryService.checkIfExists(req.app.get("db"), newIngredient)
            .then(res => {

              if (!res[0]) {
                pantryService.addIngredient(req.app.get("db"), newIngredient)
                  .then(ingredient => {
                    let recipeIngredient = {
                      recipe_id: recipeId,
                      ingredient_id: ingredient.id,
                    };
                    recipesService.addRecipeIngredient(req.app.get("db"), recipeIngredient);
                  });
              }
              else {
                let recipeIngredient = {
                  recipe_id: recipeId,
                  ingredient_id: res[0].id,
                };
                recipesService.addRecipeIngredient(req.app.get("db"), recipeIngredient);
              }
            });
        });
      });

  })
  .delete(requireAuth, (req, res, next) => {
    recipesService
      .deleteRecipe(req.app.get("db"), req.params.recipe_Id)
      .then(recipe => {
        if (recipe === -1) {
          logger.error(`Recipe with id ${recipe.id} not found`);
          return res.status(404).send("Recipe not found");
        }
        res.status(204).end();
      })
      .catch(next);
    recipesService
      .deleteRecipeIngredient(req.app.get("db"), req.params.recipe_Id);
  })
  .get(requireAuth, (req, res, next) => {
    let recipeid = req.params.recipe_Id;
    const knexInstance = req.app.get("db");
    const { id } = req.params;

    let recipeObj = {};
    let recipe_ingredients_id = [];
    let recipe_ingredients = [];
    return recipesService.getRecipeById(req.app.get("db"), recipeid).then(recipe => {
      if (!recipe) {
        logger.error(`Recipe with id ${recipe.id} not found`);
        return res.status(404).send("Recipe not found");
      } else {
        return res.json(recipe);
        // recipeObj = {
        //   id: recipe.id,
        //   title: recipe.title,
        //   owner: recipe.owner,
        //   recipe_description: xss(recipe.recipe_description),
        //   time_to_make: recipe.time_to_make,
        //   recipe_owner: recipe.recipe_owner
        // };
      }
    });

    recipesService
      .getRecipeIngredientsId(req.app.get("db"), recipeid)
      .then(idArr => {
        idArr.map(ingr => recipe_ingredients_id.push(ingr.ingredient_id));
        pantryService
          .getIngredientsByIds(req.app.get("db"), recipe_ingredients_id)
          .then(ingredients => {
            ingredients.map(ingredient => {
              recipe_ingredients.push(ingredient.ingredient_name);
            });
            recipeObj.recipe_ingredients = recipe_ingredients;
            res.json(recipeObj);
          });
      })
      .catch(next);
  });

module.exports = recipeRouter;
