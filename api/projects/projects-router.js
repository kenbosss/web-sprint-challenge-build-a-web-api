const express = require("express");
const {
  get,
  insert,
  update,
  remove,
  getProjectActions,
} = require("./projects-model");

const projectsRouter = express.Router();

projectsRouter.get("/", async (req, res) => {
  try {
    const projects = await get();
    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).send("Internal Server Error");
  }
});

projectsRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const project = await get(id);
    if (!project) {
      res.status(404).send("Project not found");
      return;
    }
    res.json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).send("Internal Server Error");
  }
});

projectsRouter.post("", async (req, res) => {
  if (!req.body.name || !req.body.description) {
    res.status(400).send();
    return;
  }
  const data = {
    name: req.body.name,
    description: req.body.description,
    completed: req.body.completed || false,
  };
  const project = await insert(data);
  res.send(project);
});

projectsRouter.put("/:id", async (req, res) => {
  const projectData = await get(req.params.id);
  if (!projectData) {
    res.status(404).send();
    return;
  }
  if (
    !req.body.name ||
    !req.body.description ||
    typeof req.body.completed !== "boolean"
  ) {
    res.sendStatus(400);
    return;
  }
  const data = {
    name: req.body.name,
    description: req.body.description,
    completed: req.body.completed || false,
  };
  const project = await update(req.params.id, data);
  res.json({
    id: project.id,
    name: project.name,
    description: project.description,
    completed: project.completed,
  });
});

projectsRouter.delete("/:id", async (req, res) => {
  const projectData = await get(req.params.id);
  if (!projectData) res.sendStatus(404);
  await remove(req.params.id);
  res.send();
});

projectsRouter.get("/:id/actions", async (req, res) => {
  const actions = await getProjectActions(req.params.id);
  res.send(actions);
});

module.exports = projectsRouter;