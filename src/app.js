if (process.env.USER) require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");

const moviesRouter = require("./movies/movies.router");
const reviewsRouter = require("./reviews/reviews.router");
const theatersRouter = require("./theaters/theaters.router");

// Quality of life...
app.use(cors());
app.use(express.json());

// Can route to movies, reviews, and theaters
app.use("/movies", moviesRouter);
app.use("/reviews", reviewsRouter);
app.use("/theaters", theatersRouter);


// Not found handler
app.use(notFound);

// Error handler
app.use(errorHandler);

module.exports = app;
