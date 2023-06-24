const knex = require("../db/connection");

/*
  Returns a promise that resolves to
  a specific critic of id criticId
*/
function read(criticId) {
  return knex("critics").select("*").where({ critic_id: criticId }).first();
}

module.exports = {
  read,
};
