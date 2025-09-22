// controllers/listControllers.js
const repo = require('../repository'); // or ./listsRepository

exports.getAll = async (req, res) => {
  try {
    const lists = await repo.getAllListsWithUsers();
    res.json(lists);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.likeList = async (req, res) => {
  try {
    const listId = parseInt(req.params.id, 10);
    const { userId } = req.body; // pass userId in body
    if (!userId) return res.status(400).json({ message: 'userId is required in body' });

    const result = await repo.likeList(listId, userId);
    if (result.alreadyLiked) return res.status(200).json({ message: 'Already liked' });

    res.status(201).json({ message: 'Liked', id: result.insertId });
  } catch (err) {
    console.error(err);
    // if unique constraint triggers, handle gracefully
    if (err && err.code === 'ER_DUP_ENTRY') return res.status(200).json({ message: 'Already liked' });
    res.status(500).json({ error: err.message });
  }
};
