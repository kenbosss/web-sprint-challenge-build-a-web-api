// Write your "actions" router here!
const express = require("express");
const { get, insert, update, remove } = require("./actions-model");
const projectsModel = require("../projects/projects-model");
const actionsRouter = express.Router();

actionsRouter.get("", async (req, res) => {
  const actions = await get();
  res.send(actions);
});

actionsRouter.get("/:id", async (req, res) => {
  const action = await get(req.params.id);
  if (!action) res.sendStatus(404);
  else res.send(action);
});

actionsRouter.post("", async (req, res) => {
  const { project_id, description, notes } = req.body;
  if (!project_id || !description || !notes) res.sendStatus(400);
  else {
    const completed = req.body.completed ? req.body.completed : false;
    const project = await projectsModel.get(project_id);
    if (!project) res.sendStatus(400);
    else {
      const actionData = {
        project_id,
        description,
        notes,
        completed,
      };
      const action = await insert(actionData);
      res.send(action);
    }
  }
});

actionsRouter.put("/:id", async (req, res) => {
  try {
    const action = await get(req.params.id);
    console.log(action);
    if (!action) res.sendStatus(404);
    else {
      const { project_id, description, notes, completed } = req.body;
      console.log(completed);
      if (
        !project_id ||
        !description ||
        !notes ||
        typeof completed !== "boolean"
      )
        res.sendStatus(400);
      else {
        const action = await update(req.params.id, req.body);
        res.send(action);
      }
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

actionsRouter.delete("/:id", async (req, res) => {
  const action = await get(req.params.id);
  if (!action) res.sendStatus(404);
  else {
    await remove(req.params.id);
    res.sendStatus(204);
  }
});

module.exports = actionsRouter;
