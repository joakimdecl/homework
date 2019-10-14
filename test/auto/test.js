"use strict";

const config = require("../../config.js");
const MoviesService = require("../../routes/movies").MoviesService;
const { assert, expect } = require("chai");

describe("movies", function() {
  it("should return a list of movies", async function() {
    const service = new MoviesService(config);

    const movies = await service.searchMovies("harry");

    expect(Array.isArray(movies));
    assert.equal(movies.length, 10);
    movies.forEach((movie) => {
      expect(movie).to.have.property("title");
    });


  })
})

