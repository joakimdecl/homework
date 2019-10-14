"use strict";

const { Pool } = require("pg");

const dbConnection = new Pool({
  host:     "localhost",
  port:     5432,
  user:     "postgres",
  password: "postgres",
  database: "movies"
});

const omdbApi = {
  endPoint: "http://www.omdbapi.com",
  key:      "a6c5891a"
};

module.exports = {
  port: 8080, //eslint-disable-line no-magic-numbers
  api:  omdbApi,
  db:   dbConnection
};
