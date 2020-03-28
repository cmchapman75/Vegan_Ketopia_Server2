const xss = require("xss");
const bcrypt = require("bcryptjs");

const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]/;

const AccountService = {
  hasUserWithUserName(db, username) {
    return db("users")
      .where({ username })
      .first()
      .then(users => !!users);
  },
  insertUser(db, newUser) {
    return db
      .insert(newUser)
      .into("users")
      .returning("*")
      .then(([users]) => users);
  },
  deleteUser(db, username) {
    return db("users")
      .where({ username })
      .delete();
  },
  deleteRecipesOfDeletedUser(db, username) {
    return db("recipes")
      .where({ owner: username })
      .delete();
  },
  updateAccount(knex, id, updatedData) {
    return knex("users")
      .where({ id })
      .update(updatedData);
  },
  validatePassword(password) {
    if (password.length < 8) {
      return "Password must be longer than 8 characters";
    }
    if (password.length > 72) {
      return "Password must be less than 72 characters";
    }
    if (password.startsWith(" ") || password.endsWith(" ")) {
      return "Password must not start or end with empty spaces";
    }
    if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
      return "Password must contain 1 upper case, lower case, number and special character";
    }
    return null;
  },

  hashPassword(password) {
    return bcrypt.hash(password, 12);
  },
  serializeUser(user) {
    return {
      id: user.id,
      username: xss(user.username),
      email_address: xss(user.email_address),
      password: xss(user.password),
    };
  }
};

module.exports = AccountService;
