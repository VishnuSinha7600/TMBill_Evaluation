const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Create task

router.post('/create', async (req, res) => {
  try {
    const { title, description, userId, completed } = req.body;
    const task = new Task({ title, description, user_id: userId, completed });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const userId = req.query.userId; // or req.params.id or from req.user if using JWT middleware

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const tasks = await Task.find({ user_id: userId }); // Correct query object
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Update task
router.put('/:id', async (req, res) => {
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedTask);
});

// Delete task
router.delete('/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
});


module.exports = router;


