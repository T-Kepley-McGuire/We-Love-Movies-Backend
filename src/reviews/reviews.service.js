const knex = require("../db/connection");

/*
  Returns a promise that resolves to
  a list of reviews of specific movie
  if movieId is given, else all reviews
*/
function list(movieId) {
  if (movieId) return knex("reviews").select("*").where({ movie_id: movieId });
  else return knex("reviews").select("*");
}

/*
  Returns a promise that resolves to
  that nothing, but deletes review of
  id reviewId
*/
function destroy(reviewId) {
  return knex("reviews").where({ review_id: reviewId }).del();
}

/*
  Returns a promise that resolves to
  a specific review of id reviewId
*/
function read(reviewId) {
  return knex("reviews").select("*").where({ review_id: reviewId }).first();
}

/*
  Returns a promise that resolves to
  an updated review of id review_id
  with updated information pulled from
  updatedReview
*/
function update(updatedReview) {
  const reviewId = updatedReview.review_id;
  return knex("reviews")
    .where({ review_id: reviewId })
    .update({ ...updatedReview });
}

module.exports = {
  read,
  list,
  delete: destroy,
  update
};
