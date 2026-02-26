const express = require('express');
const router = express.Router();
const { getTasks, createTask, deleteTask, updateTask} = require('../controllers/taskController');

router.route('/').get(getTasks).post(createTask);
router.route('/:id').put(updateTask).delete(deleteTask);

module.exports = router;