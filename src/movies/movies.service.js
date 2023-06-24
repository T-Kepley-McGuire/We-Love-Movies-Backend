const knex = require("../db/connection");

/*
  Returns promise that resolves to
  a list of all movies in database
*/
function list() {
  return knex("movies").select("*");
}

/*
  Returns promise that resolves to
  a list of movies currently showing
*/
function listShowing() {
  return knex("movies")
    .join("movies_theaters", "movies.movie_id", "movies_theaters.movie_id")
    .distinct("movies.movie_id")
    .select("movies.*")
    .where({ "movies_theaters.is_showing": true });
}

/*
  Returns promise that resolves to
  list of movies showing at theater
  of id theaterId
*/
function listShowingAtTheater(theaterId) {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select("m.*")
    .where({ "mt.is_showing": true, "mt.theater_id": theaterId });
}

/*
  Returns promise that resolves to
  one movie of id movieId
*/
function read(movieId) {
  return knex("movies").select("*").where({ movie_id: movieId }).first();
}

module.exports = {
  list,
  listShowing,
  read,
  listShowingAtTheater,
};
