const db = require("./db"); // this imports your knex connection

// Insert a new list
async function insert(data) {
  return db("Lists").insert({
    Topic: data.Topic,
    Description: data.Description,
    Content: data.Content,
    IsActive: data.IsActive !== undefined ? data.IsActive : true,
    CreatedBy: data.CreatedBy
  });
}

// Read all lists
async function readAll() {
  return db("Lists").select("*");
}

// Find a list by ID
async function findById(id) {
  return db("Lists").where({ Id: id }).first();
}

// Set IsActive (true or false)
async function setIsActive(id, value) {
  return db("Lists")
    .where({ Id: id })
    .update({ IsActive: value, UpdatedAt: db.fn.now() });
}

// Delete a list
async function deleteList(id) {
  return db("Lists").where({ Id: id }).del();
}

module.exports = {
  insert,
  readAll,
  findById,
  setIsActive,
  delete: deleteList
};
