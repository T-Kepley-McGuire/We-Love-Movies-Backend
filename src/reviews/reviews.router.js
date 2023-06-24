const router = require("express").Router();
const controller = require("./reviews.controller");

const methodNotAllowed = require("../errors/methodNotAllowed");

// Allowed Methods: DELETE, PUT
router
  .route("/:reviewId")
  .delete(controller.delete)
  .put(controller.update)
  .all(methodNotAllowed);
// Allowed Methods: GET
router.route("/").get(controller.list).all(methodNotAllowed);

module.exports = router;
