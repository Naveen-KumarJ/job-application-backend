const express = require("express");
const mongoose = require("mongoose");

const jobRoutes = require("./routes/job.routes.js");

const app = express();
const PORT = 8080;

app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://naveenjayakumar02:DUJLqiQNupt9Xjdq@cluster0.xlur5we.mongodb.net/"
  )
  .then(() => console.log("Database Connected Successfully."))
  .catch((err) => console.log("Error Connecting Database", err));

app.use("/api/v1/job", jobRoutes);

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
