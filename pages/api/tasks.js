import { NextApiRequest, NextApiResponse } from 'next';
import {
  getTasks,
  creatTask,
  updateTaskById,
  deleteTaskById,
} from '../../util/database';

const baseUrl = 'http://localhost:4000';
const response = await fetch(`${baseUrl}/tasks`);
const allTasks = await response.json();
