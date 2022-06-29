const express = require('express');

const {createTask, getAllTasks, getTasksByStatus, updateTask, deleteTask} = require('../controllers/tasks.controller');

const {createTaskValidators} = require('../middlewares/validators.middleware');
const tasksRouter = express.Router();

tasksRouter.post('/', createTaskValidators, createTask);
tasksRouter.get('/', getAllTasks);
tasksRouter.get('/:status', getTasksByStatus);
tasksRouter.patch('/:id', updateTask);
tasksRouter.delete('/:id', deleteTask);












module.exports = { tasksRouter };