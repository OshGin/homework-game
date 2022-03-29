import { request } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';
import {
  getTasks,
  creatTask,
  updateTaskById,
  deleteTaskById,
} from '../../util/database';

export default function handler(req, res) {
  //all tasks
  if (request.method === 'GET') {
    const tasks = getTasks();
    res.status(200).json(tasks);
    //new task
  } else if (request.method === 'POST') {
    let taskFromRequest = request.body;
    const newTask = await creatTask(
      (taskFromRequest = request.name),
      (taskFromRequest = request.points),
    );
    res.status(200).json(newTask);
    //update task
  } else if (request.method === 'UPDATE') {
    const tasks = updateTaskById();
    res.status(200).json(tasks);
  }
  //delete task
  if (request.method === 'DELETE');
  {
    const deletedTask = await deleteTaskById(taskId);
    res.status(200).json(deletedTask);
  }
  res.status(405).json({ error: 'Method not Allowed' });
}
