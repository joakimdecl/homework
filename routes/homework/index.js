"use strict";

const express = require("express");

function getResultsService() {
  return Promise.resolve(10) //eslint-disable-line no-magic-numbers
    .then((res) => {
      const result = { value: res };

      return result;
    });
}

function createHomeworkRouter() {
  const router = express.Router();

  router.route("/results").get(getResults);

  function getResults(req, res, next) {
    return getResultsService()
      .then(result => {
        res.json(result);
      })
      .catch(next);
  }

  return router;
}

module.exports = {
  createHomeworkRouter,
  getResultsService
};
