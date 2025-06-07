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

const editJob = async (req, res) => {
  try {
    const { _id, ...fields } = req.body;

    if (!_id) {
      return res.status(400).json({
        success: false,
        message: "Missing job ID (_id)",
      });
    }

    await jobModel.findByIdAndUpdate(_id, fields, { new: true });

    res.status(200).json({
      success: true,
      message: "Updated Job",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Job Update Failed: " + error.message,
    });
  }
};

const deleteJob = async (req, res) => {
  try {
    await jobModel.findByIdAndDelete(req.body._id);
    res.json({
      success: true,
      message: "Deleted Job",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Job Deletion Failed" + error,
    });
  }
};

const jobController = {
  createJob,
  listJob,
  deleteJob,
  editJob,
};

module.exports = jobController;
