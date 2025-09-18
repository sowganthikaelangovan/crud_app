module.exports = {
  up: `
    INSERT INTO Lists (Topic, Description, Content, IsActive, CreatedBy)
    VALUES
      ('First Topic', 'This is the first description', 'This is the first content', TRUE, 1),
      ('Second Topic', 'Another description', 'More content here', TRUE, 2);
  `,
  down: `
    DELETE FROM Lists WHERE Topic IN ('First Topic', 'Second Topic');
  `
};
