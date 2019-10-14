"use strict";

const express = require("express");
const request = require("superagent");
const uuid = require("uuid/v4");

// function getResultsService() {
//   return Promise.resolve(10) //eslint-disable-line no-magic-numbers
//     .then((res) => {
//       const result = { value: res };

//       return result;
//     });
// }

class MoviesService {
  constructor(config) {
    this.api = config.api;
    this.db = config.db;
  }

  searchMovies(title) {
    return request
      .get(this.api.endPoint)
      .query({ apikey: this.api.key })
      .query({ s: title })
      .then((res) => {
        const movies = res.body.Search;

        return movies.map((movie) => {
          return {
            title:     movie.Title,
            year:      movie.Year,
            posterUrl: movie.Poster
          };
        });
      });
  }

  async addMovie(movie) {
    const query = "INSERT INTO movies(id, year, title, poster) VALUES($1, $2, $3, $4) RETURNING *";
    const params = [ uuid(), movie.title, movie.year, movie.posterUrl ];

    const res = await this.db.query(query, params);

    return res.rows[0];
  }

  async getMovies() {
    const query = "SELECT * from movies";

    const res = await this.db.query(query);

    return res.rows;
  }
}

function createMoviesRouter(config) {
  const router = express.Router();
  const moviesService = new MoviesService(config);

  router.route("/search").get(searchMovies);
  router.route("/").post(addMovie);
  router.route("/").get(getMovies);

  // function getResults(req, res, next) {
  //   return getResultsService()
  //     .then(result => {
  //       res.json(result);
  //     })
  //     .catch(next);
  // }

  function searchMovies(req, res, next) {
    const title = req.query.title;

    return moviesService.getMovies(title)
      .then((movies) => {
        res.json(movies);
      })
      .catch(next);
  }

  function addMovie(req, res, next) {
    const movie = req.body;

    return moviesService.addMovie(movie)
      .then((movie) => res.status(201).send(movie))
      .catch(next);
  }

  function getMovies(req, res, next) {
    return moviesService.getMovies()
      .then((movies) => res.json(movies))
      .catch(next);
  }

  return router;
}

module.exports = {
  createMoviesRouter,
  MoviesService
};
