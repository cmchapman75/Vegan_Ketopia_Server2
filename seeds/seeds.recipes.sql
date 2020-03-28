BEGIN;

TRUNCATE
    recipe_ingredients, 
    ingredients,
    recipes,
    users
    RESTART IDENTITY CASCADE;

INSERT INTO users ( username, email_address, password )
values
  ('Cyra', 'cyragetsfit@gmail.com', '$2a$12$Tv6tC.J6HJMlMEQ6TMEg2OfgHD2cYXNjyLq0YWMfmnCNvpDEXrSLq'),
  ('Chrissy', 'cmchapman75@gmail.com', '$2a$12$6.ZuE93xhiwj7wEIdF/HKOWA3GMZq1ehtzTQz0hYrEQdjUDyK3HJu');


insert into recipes ( title, ingredients, instructions, mealType, cuisineType, recipe_owner )
values
('Low Carb French Fries', '{"1/4 olive oil", "1 tsp ground smoked paprika", "1 tsp dried herbs", "salt and pepper to taste", "1/2 cup of vegan yogurt", "1/8 tsp chili flakes", "juice of 1/2 lime", "1 clove of crushed garlic or 1 tsp of garlic powder"}','{"1. Preheat the oven to 220 C/430 F", "2. Prepare yogurt sauce. Place yogurt into mixing bowl and whisk with the lime juice, paprika, chili flakes and garlic. Set aside in fridge.", "3. Wash rutabaga/swede and remove both ends with a sharp knife. Discard.", "4. Peel the rutabaga/swede and cut into large fry spaces. Be careful, this is a tough tuber!", "5. In mixing bowl, combine the olive oil and spices. Mix well.",  "6. Put the fries into the mixing bowl and massage the olive oil mixture into them.", "7. Place the oil covered fries into a baking dish, ensuring that they have space.", "8. Bake for 15-20 minutes on one side, then flip them over and cook another 10 or more minutes until they are golden and crispy on the outside.", "9. Enjoy immediately with your yogurt dipping sauce as they go soft fast!!"}', 'Side Dish', 'Universal', 1),
('Best Vegan Keto Bread', '{"1 cup coconut flour", "1/2 cup almond flour", "1/3 cup psyllium husk", "2 Tbsp chia seeds", "1/2 tsp salt", "2 1/4 warm water", "2 Tbsp apple cider vinegar", "2 tsp baking powder"}', '{"1. Preheat oven to 180 C/350 F and line a 9 in by 5 in loaf pan with parchment paper.", "2. Measure and prepare all ingredients carefully.", "3. In large mixing bowl, whisk together all the dry ingredients.", "4. Add apple cide vinegar and warm water to the dry ingredients.", "5. Combine with a spoon until a dough starts to form. Knead the dough using a press and squeeze motion until you can form a ball.", "6. Set aside for 10 minutes to let the fiber absorb the water and bind together.", "7. Shape into a loaf shape gently and place into pan.", "8. Place pan in oven on the bottom rack and bake for 45 minutes.", "9. Move oan to the middle rack and bake for an additional 15 minutes. (Cover with foil if loaf top is too dark)", "10. Remove from oven and insert skewer into middle of the bread to ensure its completely done.", "11. Cool on rack for 4 hours and enjoy this delicious bread!!"}', 'Breads and Crackers', 'American', 1),
('Coconut Flour Pizza Crust', '{"1/2 cup + 2 Tbsp coconut flour", "2 Tbsp ground psyllium husk", "1/4 tsp salt", "1 Tbsp extra virgin olive oil", "1 cup warm water"}', '{"1. Preheat oven to 220 C/ 430 F", "2.In large mixing bowl add coconut flour and psyllium husk and salt. Mix well", "3. Once combined add the wet ingredients and mix well.  As dough begins to form, knead with your hands.", "4. Form dough into a ball then let sit at room temperature for 10 minutes.", "5. Once dough has set, slightly oil two pieces of parchment paper with olive oil and sandwich dough in between. ", "6. Flatten dough slightly with your hands then use rolling pin until you reach desired thickness.", "7. Peel off parchment paper and cut into circle if desired.", "8. Lift the flattened dough using the parchment paper and place on baking sheet." , "9. Pre bake the crust in the over for 12-15 minutes.", "10. Remove from oven and garnish with your chosen toppings then return to oven for 5-8 minutes.", "11. Remove from oven, cut and serve immediately!" }', 'Dinner', 'Italian', 1),
('Flaxseed Crackers', '{" 1 cup ground flaxseeds", "2 Tbsp onion powder", "1 tsp garlic powder", "1/2 tsp salt", "2 Tbsp black sesame", "2 tsp dried rosemary"}', '{"1.In a mixing bowl, combine all the dry ingredients and mix well.", "2. Add the water and mix until dough forms. Knead the dough and form into a ball.", "3. Place dough between two pieces of parchment paper and use a rolling pin to roll to about 2-4mm thick", "4. Use a pizza cutter or knife to cut the rolled dough into rectangles", "5. Use the bottom parchment piece to help you slide the crackers onto a baking sheet. Use a fork to create dots/holes on all the crackers.", "6. Bake at 180 C/ 350 F for 20-25 minutes. Check every 5 minutes for preferred doneness ", "7. Remove from oven and let cool.  These will last about 3 weeks in an airtight container"}', 'Bread and Cracker', 'American', 1),
('Cauliflower Hummus', '{"half of a cauliflower head-steamed","1/4 cup tahini paste", "3 Tbsp extra virgin olive oil", "1/2 tsp smoked paprika", "3/4 tsp salt", "4 garlic cloves-crushed", "2 Tbsp lemon juice", "1 Tbsp extra olive oil"}', '{"1.Place steamed cauliflower florets in a food processor with an S blade.", "2. To the cauliflower add tahini, olive oil, salt, garlic cloves and lemon juice.", "3. Process on high speed for about 1 minute or until it has a smooth and creamy consistency.", "4. Transfer to a serving dish and drizzle with olive oil and a sprinkle of smoked paprika", "5. Refrigerate about an hour before serving."}', 'Snack', 'Greek', 1),
('Broccoli Tots', '{"2 1/2 cups raw broccoli grated", "1 small yellow onion finely sliced", "4 flax eggs", "1/2 cup coconut flour", "3/4 cup grated vegan cheese", "salt and pepper to taste" }', '{"1. Preheat oven to 180 C/ 340 F. Cover cookie sheet with parchement paper and set aside.", "2. In food processor with the S blade, add the broccoli florets.", "3. Pulse until it has a rice like texture. Then add the flax eggs, coconut flour, grated cheese, onion, salt and pepper.", "4. Process on low speed to combine.", "5. Transfer to a bowl and shape mixture into tater tot shapes. Place on parchment paper on a cookie sheet, making sure they all have space.", "6. Bake 15-20 minutes or until crispy.", "7. Serve immediately with your dip of choice."}', 'Side Dish', 'American', 1 ),
('Keto Naan Bread', '{"1 cup warm water", "2 tsps dry yeast", "1/2 cup coconut flour", "2 Tbsp ground psyllium husk", "1/4 blanched almond flour", "1/4 tsp salt", "3 Tbsp olive oil" }', '{"1. Bloom the yeast by adding the water to a glass container and stir in the yeast. Set aside for 5 minutes.", "2. In large bowl, combine all the dry ingredients.", "3. Add olive oil to yeast mixture and then combine with the dry ingredients. Use spatula to stir until dough forms.", "4. Form into dough ball and then knead for at least 2 minutes.(The flour and husk need time to absorb all the water.) Form ball again, then set aside for 10 minutes.", "5. After 10 minutes, knead dough ball again.  (If too wet, add more husk in small amounts until you have a soft dough) Form into ball then cut into 4 equal pieces.", "6. Place one ball of dough between two pieces of parchment paper. Use rolling pin to roll the dough into a noon shape.", "7. Warm a non stick pan over medium-high heat. Place naan dough into pan with parchment paper removed. Cook on one side on high heat for about 1-2 minutes. You are looking for some black marks to appear.", "8. Flip over and cook for another minute or so.", "9. Serve warm.  You can garnish with olive oil or butter and crushed garlic or chopped coriander.", "10. Cooked naan can be stored in the pantry for two days covered with a kitchen towel, or they can be frozen (Defrost for 3 hours and warm on a skillet.)"}', 'Breads and Crackers', 'Indian', 1),
('Zoodles with Pesto', '{"4 zucchinis, ends removed", "1 tsp olive oil", "1/3 cup sunflower seeds", "2 cups fresh basil leaves", "1/3 cup extra virgin olive oil", "3 garlic cloves", "1/4 grated vegan Parmesan or nutritional yeast", "salt to taste", "1/4 cup unsweetened plain almond milk"}', '{"1. Place zucchini in your spiralizer and turn to create zoodles. (Use a vegetable peeler to create zoodles in the absence of a spiralizer.) Set aside.", "2. Heat small frying pan over medium heat.  Add sunflower seeds and toast lightly until fragrant. About 2 to 3 minutes.", "3. Transfer seeds into a food processor along with all the rest of the basil, olive oil, garlic clove, salt and parm. Process until smooth. (Stop processor and scrap down sides as needed to incorporte all the ingredients.)", "4. Heat 1 tsp olive oil in large pan on low-medium heat.  Add the zoodles and toss for 2-5 minutes, stirring often to warm zoodles evenly.", "5. Stir in the sunflower seed pest and add the almond milk to create a sauce.", "6. Cook for 1-2 minutes until sauce is hot and thick and bubbles form on the sides of the pan. Try not to cook longer than 8 minutes.", "7. Serve with extra grated vegan parm."}', 'Dinner', 'Italian', 1);

INSERT INTO ingredients (ingredient_name, in_stock, notes, ingredient_owner)
values  
    ('kale', 'in-stock', 'curly', 2),
    ('black beans', 'in-stock', 'dried', 1),
    ('dried basil', 'low', null, 2);

INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
values
    (1, 2),
    (1, 2),
    (2, 1);

COMMIT;