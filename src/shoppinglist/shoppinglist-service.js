const ListService = {
  getIngredients(db, user_id) {
    return db("ingredients")
      .select("*")
      .where("ingredient_owner", user_id)
      .where("in_stock", false);
  },
  
};

module.exports = ListService;