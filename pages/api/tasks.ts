import { NextApiRequest, NextApiResponse } from 'next';
import {
  Task,
  getTasks,
  creatTask,
  updateTaskById,
  deleteTaskById,
} from '../../util/database';

type TaskRequestBody = {
  task: Task;
};

type TaskNextApiRequest = NextApiRequest & {
  body: TaskRequestBody;
};
export type TasksResponseBodyGet = {
  tasks: Task[];
};
export type TaskResponseBody = { error: string } | { task: Task };

export default async function handler(
  request: TaskNextApiRequest,
  response: NextApiResponse<TaskNextApiRequest>,
) {
  // all tasks
  if (request.method === 'GET') {
    const tasks = await getTasks();
    response.status(200).json(tasks);
  }
  // new task
  if (request.method === 'POST') {
    const taskFromRequest = request.body;
    const newTask = await creatTask(
      taskFromRequest.name,
      taskFromRequest.points,
    );
    response.status(200).json(newTask);
  }
  // update task
  if (request.method === 'PUT') {
    const updatetasks = updateTaskById();
    response.status(200).json(updatetasks);
  }
  // delete task
  if (request.method === 'DELETE') {
    const deletedTask = await deleteTaskById();
    response.status(200).json(deletedTask);
  }
  response.status(405).json({ error: 'Method not Allowed' });
}
