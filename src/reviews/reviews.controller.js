const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./reviews.service");
const criticsService = require("../critics/critics.service");

/*
  Tests if review exists in database. If so,
  saves review to res.locals. If not, throws
  404 review not found error
*/
async function reviewExists(req, res, next) {
  const reviewId = Number(req.params.reviewId);

  const foundReview = await service.read(reviewId);
  console.log(foundReview);
  if (foundReview) {
    res.locals.review = foundReview;
    return next();
  }
  next({
    status: 404,
    message: `Review cannot be found.`,
  });
}

/*
  Use-case specific middleware that tests
  if movie is saved to res.locals. Useful
  for review functions using specific movies
  passed from the movie router
*/
function checkIfMovie(req, res, next) {
  if (res.locals.movie) return next();

  next({
    status: 428,
    message: `Can only retrieve reviews for specific movies.`,
  });
}

/*
  GET /movies/:movieId/reviews
  **Only valid for specific movies**
  Returns list of reviews on movie
  saved in res.locals
*/
async function list(req, res, next) {
  const movieId = res.locals.movie.movie_id;
  const reviewList = await service.list(movieId);
  const reviewsCritics = await Promise.all(reviewList.map(async (review) => {
    return {
      ...review,
      critic: await criticsService.read(review.critic_id)
    };
  }))
  res.json({ data: reviewsCritics });
}

/*
  DELETE /reviews/:reviewId
  Deletes review saved in res.locals
*/
async function destroy(req, res, next) {
  await service.delete(res.locals.review.review_id);
  res.sendStatus(204);
}

/*
  PUT /reviews/:reviewId
  Updates review saved in res.locals
  Needs good input data
*/
async function update(req, res, next) {
  const updatedReview = {
    ...res.locals.review,
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };

  await service.update(updatedReview);
  const newReview = await service.read(updatedReview.review_id);
  newReview.critic = await criticsService.read(newReview.critic_id);
  res.json({ data: newReview });
}

module.exports = {
  list: [checkIfMovie, asyncErrorBoundary(list)],
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
};
