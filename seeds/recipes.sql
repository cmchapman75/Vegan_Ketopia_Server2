CREATE TABLE IF NOT EXISTS user_info (
    user_login
    user_password
    user_favorites
    user_profile
)


CREATE TABLE IF NOT EXISTS recipes_info (
    recipe_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    title TEXT NOT NULL,
    genre TEXT NOT NULL,
    meal_type TEXT NOT NULL, 
    main_recipe_macro TEXT NOT NULL, 
    ingredients TEXT NOT NULL,
    serving size TEXT NOT NULL,
    calories TEXT NOT NULL,
    fat TEXT,
    saturated_fat TEXT,
    protein TEXT,
    total_carbs TEXT,
    fiber TEXT,
    net_carbs TEXT,
    total_sugar TEXT,
    vitamin_D TEXT,
    Vitamin_C TEXT, 
    Calcium TEXT, 
    Iron TEXT,
    Potassium TEXT,

    
)


