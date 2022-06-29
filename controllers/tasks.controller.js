const {Task} = require('../models/task.model');

const { catchAsync } = require('../utils/catchAsync.util');


const createTask = catchAsync(async (req, res, next) => {

  const {title, userId, limitDate} = req.body;

  const newTask = await Task.create({
    title,
    userId,
    limitDate,
  })

  res.status(201).json({
    status: 'success',
    newTask,
  })

})


const getAllTasks = catchAsync(async (req, res, next) => {
  
    const tasks = await Task.findAll({
      include: User,
    })
  
    res.status(200).json({
      status: 'success',
      tasks,
    })
  
})



const getTasksByStatus = catchAsync(async (req, res, next) => {
  const tasks = await Task.findAll({
    where: {status: 'active, completed, late, cancelled'},
    include: User,
  })

  if(!tasks) {
    return next(new AppError('No tasks found', 404));
  }else {
     res.status(200).json({
    status: 'success',
    tasks,
  })
  }
 
})

const updateTask = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const {title, status, limitDate} = req.body;

  const task = await Task.findOne({where: id, status: 'active'});
  if(!task) {
    return next(new AppError('Task not found', 404));
  }else {
    await task.update({ title, status, limitDate});

  res.status(204).json({status: 'success'})
  }

  
 
})


const deleteTask = catchAsync(async (req, res, next) => {
      const {id} = req.params;
      const task = await Task.findOne({where: {id}});
      if(!task) {
        return next(new AppError('Task not found', 404));

      }else {
        await task.update({status: 'cancelled'});
        res.status(204).json({
          status: 'success',
      
        })
      }
      
      
})


module.exports = {getAllTasks, getTasksByStatus, updateTask, deleteTask, createTask};