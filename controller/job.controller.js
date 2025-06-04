const jobModel = require("../model/job.model");

const createJob = async (req, res) => {
  try {
    console.log(req.body);
    await jobModel.create(req.body);
    res.json({
      success: true,
      message: "Job Created Successfully.",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid Data " + error,
    });
  }
};

const listJob = async (req, res) => {
  const minSalary = req.query.minSalary || 0;
  try {
    const jobs = await jobModel.find({
      salary: {
        $gte: minSalary,
      },
    });
    res.json({
      success: true,
      message: "Job List Fetched Successfully",
      results: jobs,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Fetching Job List Failed",
    });
  }
};

const editJob = (req, res) => {
  res.json({
    success: true,
    message: "Updated Job",
  });
};

const deleteJob = (req, res) => {
  res.json({
    success: true,
    message: "Deleted Job",
  });
};

const jobController = {
  createJob,
  listJob,
  deleteJob,
  editJob,
};

module.exports = jobController;
