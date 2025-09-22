const db = require('./db'); // your db connection file

// Get all lists with creator and liked users
async function getAllLists() {
  const query = `
    SELECT 
        lst.Id,
        lst.Topic,
        lst.Description,
        lst.Content,
        lst.IsActive,
        lst.CreateAt,
        u.FirstName AS CreatedByFirstName,
        u.LastName AS CreatedByLastName,
        COALESCE(
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'UserId', lu.Id,
                    'FirstName', lu.FirstName,
                    'LastName', lu.LastName
                )
            ), JSON_ARRAY()
        ) AS LikedUsers
    FROM Lists lst
    JOIN Users u ON lst.CreatedBy = u.Id
    LEFT JOIN Likes lk ON lst.Id = lk.ListId
    LEFT JOIN Users lu ON lk.UserId = lu.Id
    GROUP BY lst.Id;
  `;

  const [rows] = await db.query(query);
  return rows;
}

module.exports = {
  getAllLists,
  // keep other CRUD methods (insert, findById, etc.)
};
