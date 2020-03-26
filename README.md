# Vegan Ketopia:

    Vegan Ketopia is a best friend in the kitchen.
     


## Contributors:


- Christina Chapman


## Visit Kitchen Helper:

  * [Client Side Repo]()

  * [Live App]()
  
  
## Screenshots:

   ![Landing Logo](src/Assets/LandingLogo.gif)

   ![Home Page](src/Assets/homePage.gif)

   ![Pantry Landing Page](src/Assets/pantryLanding.gif)   

   ![Recipe Landing Page](src/Assets/recipeLanding.gif)

   ![Recipe Detail Page](src/Assets/recipeDetail.gif)
   
   ![Meal Plan Add](src/Assets/planAdd.gif)
   
   ![Dark Mode Banner](src/Assets/DarkMode-Banner.gif)



## Technologies:

**Front End Tech:** HTML, CSS, JavaScript, React, Modal, Widgets(Dark Mode)

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
| GET       | /recipes | view user's saved recipes  |
| POST       | /recipes | add new recipe |
| PATCH     | /recipes/:recipe_Id | update/edit recipe |
| GET       | /recipes/:recipe_Id | delete recipe |


