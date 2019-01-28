"use strict";

const express = require("express");

function createRouter() {
    const router = express.Router();
    const homeworkRouter = require("./homework").createHomeworkRouter();

    router.use("/homework", homeworkRouter);

    return router;
}

module.exports = createRouter;