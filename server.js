const express = require("express");
const bodyParser = require("body-parser");
const listRoutes = require("./routes/listroutes");

const app = express();
app.use(bodyParser.json());

// Root route
app.get("/", (req, res) => {
  res.send("🚀 CRUD API is running... Use /lists endpoint");
});

// Use list routes
app.use("/lists", listRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
