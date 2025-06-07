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
    // await jobModel.updateOne(
    //   {
    //     _id: req.body._id,
    //   },
    //   {
    //     $set: {
    //       ...req.body,
    //     },
    //   }
    // );
    const fields = { ...req.body };
    delete fields._id;
    await jobModel.findByIdAndUpdate(req.body._id, { ...fields });
    res.json({
      success: true,
      message: "Updated Job",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Job Update Failed " + error,
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
