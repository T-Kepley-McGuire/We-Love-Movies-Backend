const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./movies.service");

/*
  Tests if movie exists in database. If so,
  saves movie to res.locals. If not, throws
  404 movie not found error
*/
async function movieExists(req, res, next) {
  const movieId = Number(req.params.movieId);

  const foundMovie = await service.read(movieId);
  if (foundMovie) {
    res.locals.movie = foundMovie;
    return next();
  }
  next({
    status: 404,
    message: `Movie cannot be found.`,
  });
}

/*
  GET /movies
  lists all movies, or in case of query
  ?is_showing=true, lists only movies
  currently showing
*/
async function list(req, res, next) {
  var list = null;
  if (req.query.is_showing === "true") {
    list = await service.listShowing();
  } else {
    list = await service.list();
  }
  res.json({ data: list });
}

/*
  GET /movies/:movieId
  sends one movie of id movieId
*/
function read(req, res, next) {
  res.json({ data: res.locals.movie });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExists), read],
  movieExists: asyncErrorBoundary(movieExists)
};
