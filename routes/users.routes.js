
const express = require('express');
const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser

} = require('../controllers/users.controller')

const {userExists} = require('../middlewares/users.middlewares.js');
const {createUserValidators} = require('../middlewares/validators.middleware');


const usersRouter = express.Router();

usersRouter.get('/', getAllUsers);
usersRouter.post('/', createUserValidators, createUser);
usersRouter.patch('/:id', userExists, updateUser);
usersRouter.delete('/:id', userExists, deleteUser);



module.exports = { usersRouter };