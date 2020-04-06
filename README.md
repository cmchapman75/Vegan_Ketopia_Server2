# Vegan Ketopia:

    Vegan Ketopia is a best friend in the kitchen.  The app stars with the ability to search recipes and create new recipes.  You can also track the ingredients in your pantry.  The features still in development are a meal planning feature and a shopping list feature.
     


## Contributors:


- Christina Chapman


## Visit Kitchen Helper:

  * [Client Side Repo](https://github.com/cmchapman75/Vegan_Ketopia_Client2)

  * [Live App](https://vegan-ketopia.now.sh/)
  
  
## Screenshots:

   ![Landing Logo](src/Assets/Landing.gif)

   ![Home Page](src/Assets/Dashboard.gif)

   ![Pantry Landing Page](src/Assets/Pantry.gif)   

   ![Recipe Landing Page](src/Assets/Recipes.gif)

   ![Recipe Detail Page](src/Assets/RecipeDetail.gif)
   




## Technologies:

**Front End Tech:** HTML, CSS, JavaScript, React, Modal

**Back End Tech:** NodeJs, ExpressJs, PostgreSQL

**Testing Tech:** Jest, Snapshot, Enzyme, Lodash, Mocha, Chai


## API Documentation:

   ### Pantry: 

| **HTTP Verb** | **Path**                           | **Used for**         |
| --------- |:--------------------------------------:| --------------------:|
| GET       | /pantry | view user's ingredients |
| POST      | /pantry | add new ingredient |
| PATCH     | /pantry/:ingredient_id | update/edit ingredient |
| DELETE    | /pantry/:ingredient_id | delete ingredient |


  ### Recipes:
  
| **HTTP Verb** | **Path**                           | **Used for**         |
| --------- |:--------------------------------------:| --------------------:|
| GET       | /recipes/searach | view user's saved recipes  |
| POST       | /recipes | add new recipe |
| GET       | /recipes/:recipe_Id | delete recipe |


