// controllers/userControllers.js
const repo = require('../repository');

exports.createUser = async (req, res) => {
  try {
    const { FirstName, LastName, Email, Password } = req.body;
    if (!FirstName || !LastName || !Email) {
      return res.status(400).json({ message: 'FirstName, LastName and Email required' });
    }
    const id = await repo.createUser({ FirstName, LastName, Email, Password });
    res.status(201).json({ id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
