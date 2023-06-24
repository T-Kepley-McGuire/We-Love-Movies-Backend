const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./theaters.service");
const moviesService = require("../movies/movies.service");

/*
    GET /theaters
    Lists all theaters in database
    with all movies showing at each
    theater as part of each theater
    object with key "movies"
*/
async function list(req, res, next) {
  const listTheaters = await service.list();
  const theatersMovies = await Promise.all(
    listTheaters.map(async (theater) => {
      return {
        ...theater,
        movies: await moviesService.listShowingAtTheater(theater.theater_id),
      };
    })
  );
  res.json({ data: theatersMovies });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
