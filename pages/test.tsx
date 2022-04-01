import Head from 'next/head';
import { Fragment, useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import { Task } from '../util/database';
import { TasksResponseBodyGet, TaskResponseBody } from './api/tasks';

export default function Test() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [name, setName] = useState('');
  const [points, setPoints] = useState<number>();
  const [idEditTaskId, setOnEditTaskId] = useState<number>();
  const [taskOnEdit, setTaskOnEdit] = useState('');
  const [pointsOnEdit, setPointsOnEdit] = useState<number>();
  const [error, setError] = useState('');
  // DELET
  async function deleteTask(id: number) {
    const deleteResponse = await fetch(`/api/tasks/${id}`, {
      method: 'DELETE',
    });
    const deleteResponseBody =
      (await deleteResponse.json()) as TaskResponseBody;

    if ('error' in deleteResponseBody) {
      setError(deleteResponseBody.error);
      return;
    }

    const newTaskList = tasks.filter((task) => {
      return deleteResponseBody.task.id !== task.id;
    });

    setTasks(newTaskList);
  }
  // CREATE
  async function createTask() {
    if (!name || !points) {
      console.log('I need more data to create');
      return;
    }

    const createResponse = await fetch(`/api/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        points: points,
      }),
    });

    const createResponseBody =
      (await createResponse.json()) as TaskResponseBody;

    if ('error' in createResponseBody) {
      setError(createResponseBody.error);
      return;
    }

    const newTasksList = [...tasks, createResponseBody.task];

    setTasks(newTasksList);
  }
  // UPDATE
  async function updateTask(id: number) {
    if (!taskOnEdit || !pointsOnEdit) {
      console.log('I need more data to update');
      return;
    }
    const putResponse = await fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: taskOnEdit,
        points: pointsOnEdit,
      }),
    });
    const putResponseBody = (await putResponse.json()) as TaskResponseBody;

    if ('error' in putResponseBody) {
      setError(putResponseBody.error);
      return;
    }

    const updatedTaskList = tasks.map((task) => {
      if (task.id === putResponseBody.task.id) {
        return putResponseBody.task;
      } else {
        return task;
      }
    });

    setTasks(updatedTaskList);
  }
  // GET
  useEffect(() => {
    const getTasks = async () => {
      const readResponse = await fetch('/api/tasks');
      const readResponseBody =
        (await readResponse.json()) as TasksResponseBodyGet;
      setTasks(readResponseBody.tasks);
    };

    getTasks().catch(() => {});
  }, []);
  // ERROR
  if (error) {
    return (
      <div>
        <Head>
          <title>Error</title>
          <meta name="description" content="This is the frontend of my api" />
        </Head>

        <h1>Error</h1>
        {error}
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>TEST</title>
        <meta name="testing" content="test test test" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>TEST</h1>
        <br />

        <div>here we have the test list</div>
        <label>
          Name:
          <input
            onChange={(event) => setName(event.currentTarget.value)}
            value={name}
          />
        </label>
        <br />
        <label>
          Points:
          <input
            onChange={(event) => setPoints(parseInt(event.currentTarget.value))}
            value={points}
            type="number"
          />
        </label>
        <br />
        <button onClick={() => createTask()}>Create Task</button>
        <br />
        {tasks.map((task) => {
          const isDisabled = idEditTaskId !== task.id;
          return (
            <Fragment key={task.id}>
              <br />
              <span>ID: {task.id} </span>
              <input
                onChange={(event) => setTaskOnEdit(event.currentTarget.value)}
                value={isDisabled ? task.name : taskOnEdit}
                disabled={isDisabled}
              />
              <input
                type="number"
                onChange={(event) =>
                  setPointsOnEdit(parseInt(event.currentTarget.value))
                }
                value={isDisabled ? task.points : pointsOnEdit}
                disabled={isDisabled}
              />
              <button
                onClick={() => {
                  setOnEditTaskId(task.id);
                  setTaskOnEdit(task.name);
                  setPointsOnEdit(task.points);
                }}
              >
                Edit
              </button>
              ) : (
              <button
                onClick={() => {
                  updateTask(task.id).catch(() => {});
                  setOnEditTaskId(undefined);
                }}
              >
                Save
              </button>
              <button
                className={styles.button}
                onClick={() => {
                  deleteTask(task.id).catch(() => {});
                }}
              >
                Delete Task
              </button>
            </Fragment>
          );
        })}
      </main>
    </div>
  );
}
