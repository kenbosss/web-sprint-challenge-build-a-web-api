// add middlewares here related to actions
const { getProjectActions } = require("./projects-model");


const getProjectActionsMiddleware = async (req, res, next) => {
  try {
    const actions = await getProjectActions(req.params.id);
    req.projectActions = actions; // Attach actions to the request object
    next(); 
  } catch (error) {
    console.error("Error fetching project actions:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getProjectActionsMiddleware,
};
