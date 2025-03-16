const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
};

exports.createTask = async (req, res) => {
  const { title, description } = req.body;
  try {
    const task = new Task({ title, description, userId: req.userId });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findOneAndUpdate(
      { _id: id, userId: req.userId },
      req.body,
      { new: true }
    );
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findOneAndDelete({ _id: id, userId: req.userId });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error });
  }
};