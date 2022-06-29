
const { User } = require('../models/user.model');
const {Task} = require('../models/task.model');

const {catchAsync} = require('../utils/catchAsync.util');




const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({ 
    where: { status: 'active' }
  ,include: Task
  });

  res.status(200).json({
    status: 'success',
    users,
  });

 

})


const createUser = catchAsync(async (req, res, next) => {
  const {name, email, password} = req.body;

  const newUser = await User.create({
    name,
    email,
    password,
    
  })

  res.status(201).json({
    status: 'success',
    newUser,
  })
})



const updateUser = catchAsync(async (req, res, next) => {

const {user} = req;
const {name, email} = req.body;

await user.update({ name, email});

res.status(204).json({status: 'success'})

})



const deleteUser = catchAsync(async (req, res, next) => {
  const {user} = req;

  await user.update({status: 'disabled'});

  res.status(204).json({status: 'success'})
})








module.exports = { getAllUsers, createUser, updateUser, deleteUser };