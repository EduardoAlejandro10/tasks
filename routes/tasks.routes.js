const express = require('express');

const {createTask, getAllTasks, getTasksByStatus, updateTask, deleteTask} = require('../controllers/tasks.controller');

const {createTaskValidators} = require('../middlewares/validators.middleware');
const {taskExists} = require('../middlewares/tasks.middleware');
const tasksRouter = express.Router();

tasksRouter.post('/', createTaskValidators, createTask);
tasksRouter.get('/', getAllTasks);
tasksRouter.get('/:status', getTasksByStatus);
tasksRouter.patch('/:id', taskExists, updateTask);
tasksRouter.delete('/:id', taskExists, deleteTask);












module.exports = { tasksRouter };