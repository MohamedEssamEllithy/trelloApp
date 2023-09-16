import express from 'express'
import { addTask ,allTasks, deleteTask, updateTask } from './task.controller.js'
import { addTaskValidationSchema } from './task.validation.js';
import validation from '../../middleware/validation.js';
import authTask from '../../middleware/auth-task.js';
const taskRoutes =express.Router()

taskRoutes.post("/addtask/:id", validation(addTaskValidationSchema), addTask);
taskRoutes.get("/alltasks",allTasks)
taskRoutes.patch("/updatetask/:id", authTask, updateTask);
taskRoutes.delete("/deletetask/:id",authTask, deleteTask);

export default taskRoutes