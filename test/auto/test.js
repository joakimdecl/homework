"use strict";

const results = require("../../routes/homework");
// const { assert } = require("chai");

describe("results", function() {
  it("should return a valid result", async function() {
    const res = await results.getResultsService();

    assert.deepEqual(res, { value: 10});

  });
})
