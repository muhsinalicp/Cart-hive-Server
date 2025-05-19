const dashboardController = async (req, res) => {
  try {
    const data = req.user;

    return res.status(200).json({ status: "done", data });
  } catch (error) {
    console.log("Error in seller dashboardController", error);
    res.status(500).json({ message: error.message });
  }
};

export default dashboardController;
