const express = require("express");
const {
  createJob,
  listJob,
  deleteJob,
  editJob,
} = require("../controller/job.controller.js");
const router = express.Router();

router.get("/list", listJob);

router.post("/create", createJob);

router.patch("/edit", editJob);

router.delete("/delete", deleteJob);

module.exports = router;
