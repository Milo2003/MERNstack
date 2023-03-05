const express = require('express');
const taskModel = require('../models/task.model');
const router = express.Router();

router.get('/', async (req, res) => {
  const tasks = await taskModel.find();
  res.json(tasks);
});
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const task = await taskModel.findById(id);
  res.json(task);
});
router.post('/', (req, res) => {
  const { name, description } = req.body;
  const newTask = new taskModel({ name, description });
  newTask.save();
  res.json(newTask);
});
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  const task = await taskModel.findByIdAndUpdate(id, changes, { new: true });
  res.json(task);
});
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const task = await taskModel.findByIdAndDelete(id);
  if (!task) {
    res.json({message: `task # ${id} not found` })
  }
  res.json({message: `Task #${id} has been deleted `});
});

module.exports = router;

