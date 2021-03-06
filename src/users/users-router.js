const express = require("express");
const usersRouter = express.Router();
const bodyParser = express.json();
const UsersService = require("./users-service");
const path = require("path");
const jwt = require("jsonwebtoken");
const AuthService = require("../auth/auth-service");
const config = require("../config");

const checkToken = (req, res, next) => {
  const header = req.headers["authorization"];

  if (typeof header !== "undefined") {
    const bearer = header.split(" ");
    const token = bearer[1];
    req.token = token;
    next();
  } else {
    res.sendStatus(403);
  }
};

usersRouter
  .route("/")
  .post(bodyParser, (req, res, next) => {
    console.log("Working");
    const { username, email_address, password } = req.body;
    for (const field of [ "username", "email_address", "password"]) {
      if (!req.body[field]) {
        return res.status(400).json({
          error: `Missing '${field}' in request body.`
        });
      }
    }
    
    const passwordError = UsersService.validatePassword(password);

    if (passwordError) {
      return res.status(400).json({ error: passwordError });
    }
    UsersService.hasUserWithUserName(req.app.get("db"), username)
      .then(hasUserWithUserName => {
        if (hasUserWithUserName)
          return res.status(400).json({ error: "Username already taken" });

        return UsersService.hashPassword(password).then(hashedPassword => {
          const newUser = {
            email_address,
            username,
            password: hashedPassword
          };
          return UsersService.insertUser(req.app.get("db"), newUser)
            .then((user) => {
              return res
                .status(201)
                .location(path.posix.join(req.originalUrl, `/${user.id}`))
                .json(UsersService.serializeUser(user));
            })
            .catch((err) => {
              console.error(err);
            });
        })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err, "db:", req.app.get("db").connection().client.config);
        next();
      });
  })
  .get(checkToken, (req, res, next) => {
    jwt.verify(req.token, config.JWT_SECRET, (err, authorizedData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        AuthService.getUserWithUserName(
          req.app.get("db"),
          authorizedData.sub
        ).then(dbUser => {
          delete dbUser.password;
          res.json({ dbUser });
        });
      }
    });
  });

usersRouter.route("/:username").delete((req, res, next) => {
  const { username } = req.params;
  const knexInstance = req.app.get("db");

  UsersService.deleteUser(knexInstance, username)
    .then(UsersService.deleteRecipesOfDeletedUser(knexInstance, username))
    .then(res.status(204).end())
    .catch(next);
});

usersRouter.route("/src/:username").get(bodyParser, (req, res, next) => {
  const { username } = req.params;
  AuthService.getUserWithUserName(req.app.get("db"), username).then(dbUser => {
    delete dbUser.password;
    res.json({
      dbUser
    });
  });
});

usersRouter.route("/src/:id").get(bodyParser, (req, res, next) => {
  const { id } = req.params;
  AuthService.getUserWithId(req.app.get("db"), id).then(dbUser => {
    delete dbUser.password;
    res.json({
      dbUser
    });
  });
});

usersRouter.patch("/edit/:id", bodyParser, async (req, res, next) => {
  const knexInstance = req.app.get("db");
  const { id } = req.params;
  const { email_address, username, password } = req.body;
  let updatedData = {
    username,
    email_address,    
    password
  };

  const numberOfValues = Object.values(updatedData).filter(Boolean).length;
  if (numberOfValues === 0) {
    return res.status(400).json({
      error: {
        message:
          "Request body must contain username, email address, and password"
      }
    });
  }

  if (username) {
    const hasUserUsername = await UsersService.hasUserWithUserName(
      req.app.get("db"),
      username
    );
    if (hasUserUsername) {
      return res.status(400).json({
        error: "Username already taken"
      });
    } else {
      updatedData.user_name = username;
    }
  }

  if (password) {
    const passwordError = UsersService.validatePassword(password);
    if (passwordError) {
      return res.status(400).json({
        error: passwordError
      });
    }
    await UsersService.hashPassword(password).then(hashedPassword => {
      updatedData.password = hashedPassword;
    });
  }

  return UsersService.updateAccount(knexInstance, id, updatedData).then(
    update => {
      res.status(204).json(UsersService.serializeUser(update));
    }
  );
});

module.exports = usersRouter;
