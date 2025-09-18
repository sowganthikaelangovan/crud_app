// routes/listRoutes.js
const express = require("express");
const router = express.Router();
const listControllers = require("../controllers/listControllers");

// Routes
router.get("/", listControllers.getAllLists);
router.get("/:id", listControllers.getListById);
router.post("/", listControllers.createList);
router.put("/:id/active", listControllers.updateIsActive);
router.delete("/:id", listControllers.deleteList);

module.exports = router;
