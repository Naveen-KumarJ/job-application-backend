const express = require("express");
const mongoose = require("mongoose");

const jobRoutes = require("./routes/job.routes.js");

const app = express();
const PORT = 8080;

app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/jobapp")
  .then(() => console.log("Database Connected Successfully."))
  .catch((err) => console.log("Error Connecting Database", err));

app.use("/api/v1/job", jobRoutes);

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
