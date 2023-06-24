const router = require("express").Router();
const controller = require("./movies.controller");

const methodNotAllowed = require("../errors/methodNotAllowed");

const theatersRouter = require("../theaters/theaters.router");
const reviewsRouter = require("../reviews/reviews.router");

// Route theaters and reviews to respective routers after ensuring good url
router.use("/:movieId/theaters", controller.movieExists, theatersRouter);
router.use("/:movieId/reviews", controller.movieExists, reviewsRouter);
// Allowed Methods: GET
router.route("/:movieId").get(controller.read).all(methodNotAllowed);
// Allowed Methods: GET
router.route("/").get(controller.list).all(methodNotAllowed);

module.exports = router;
