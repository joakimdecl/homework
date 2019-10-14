"use strict";

const express = require("express");

function createRouter(config) {
  const router = express.Router(); //eslint-disable-line
  const moviesRouter = require("./movies").createMoviesRouter(config);

  router.use("/movies", moviesRouter);

  return router;
}

module.exports = createRouter;
