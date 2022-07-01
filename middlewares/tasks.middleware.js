// Models
const { Task } = require('../models/task.model');


const { AppError } = require('../utils/appError.util');
const { catchAsync } = require('../utils/catchAsync.util');

const taskExists = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const task = await Task.findOne({ where:  {id},  } );

	if (!task || task.status !== 'active') {
		return next(new AppError('User not found', 404));
	}

	req.task = task;
	next();
});

module.exports = { taskExists };
