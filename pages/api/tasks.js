//import { request } from 'http';
//import { NextApiRequest, NextApiResponse } from 'next';
import {
  getTasks,
  creatTask,
  updateTaskById,
  deleteTaskById,
} from '../../util/database';

export default async function handler(req, res) {
  //all tasks
  if (req.method === 'GET') {
    const tasks = getTasks();
    res.status(200).json(tasks);
  }
  //new task
  if (req.method === 'POST') {
    const taskFromRequest = req.body;
    const newTask = await creatTask(
      taskFromRequest.name,
      taskFromRequest.points,
    );
    res.status(200).json(newTask);
  }
  //update task
  if (req.method === 'PUT') {
    const updatetasks = updateTaskById();
    res.status(200).json(updatetasks);
  }
  //delete task
  if (req.method === 'DELETE');
  {
    const deletedTask = await deleteTaskById();
    res.status(200).json(deletedTask);
  }
  res.status(405).json({ error: 'Method not Allowed' });
}
