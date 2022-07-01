const {Task} = require('../models/task.model');
const {User} = require('../models/user.model');

const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');


const createTask = catchAsync(async (req, res, next) => {

  const {title, userId, startDate, limitDate} = req.body;

  const newTask = await Task.create({
    title,
    userId,
    startDate,
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
  const {status} = req.params;

  if(!['active', 'completed','late', 'cancelled'].includes(status)) {
    return next(new AppError('Status not found', 404));
  }

  const tasks = await Task.findAll({
    where: { status },
    include: User,
  })
  
    res.status(200).json({
      status: 'success',
      tasks,
    })
  

})
  
 


const updateTask = catchAsync(async (req, res, next) => {
  const {task} = req;
  const { time } = req.body;

  if (new Date(time) < new Date(task.startDate)) {
    return next(new AppError('Time is before start date', 400));
  }

  if (new Date(time) > new Date(task.limitDate)) {
    await task.update({ status: 'late' });
  } else {
    await task.update({ status: 'completed' });
  }
  
await task.update({ time })
 
res.status(204).json({status: 'success',  })

  

  
 
})


const deleteTask = catchAsync(async (req, res, next) => {
  const {task} = req;

        await task.update({status: 'cancelled'});
        
        res.status(204).json({
          status: 'success',
      
        })
      
})


module.exports = {getAllTasks, getTasksByStatus, updateTask, deleteTask, createTask}