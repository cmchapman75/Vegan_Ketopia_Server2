const express = require("express");
const logger = require("../logger");
const ListService = require("./shoppinglist-service");
const requireAuth = require("../middleware/jwt-auth");
const xss = require("xss");
const path = require("path");

const bodyParser = express.json();
const listRouter = express.Router();

const serializeList = list => {
  return {
    ...list
  };
};

listRouter
  .route("/")
  .get(requireAuth, (req, res, next)  => {
      let         = req.query.q
  })