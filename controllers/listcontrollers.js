// controllers/listControllers.js
const repo = require("../repository");

// ✅ Get all lists
exports.getAllLists = async (req, res) => {
  try {
    const lists = await repo.readAll();
    res.json(lists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get list by Id
exports.getListById = async (req, res) => {
  try {
    const { id } = req.params;
    const list = await repo.findById(id);
    if (!list) return res.status(404).json({ message: "List not found" });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Create a new list
exports.createList = async (req, res) => {
  try {
    const { Topic, Description, Content, CreatedBy } = req.body;
    await repo.insert({ Topic, Description, Content, CreatedBy });
    res.status(201).json({ message: "List created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Update list IsActive status
exports.updateIsActive = async (req, res) => {
  try {
    const { id } = req.params;
    const { value } = req.body;
    await repo.setIsActive(id, value);
    res.json({ message: "List status updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Delete list
exports.deleteList = async (req, res) => {
  try {
    const { id } = req.params;
    await repo.delete(id);
    res.json({ message: "List deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
