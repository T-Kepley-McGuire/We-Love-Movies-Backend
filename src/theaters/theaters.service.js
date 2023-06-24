const knex = require("../db/connection");

/*
    Returns a promise that resolves to
    a list of all theaters
*/
function list() {
  return knex("theaters").select("*");
}

module.exports = {
  list,
};
