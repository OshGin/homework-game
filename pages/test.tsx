import Head from 'next/head';
import { Fragment, useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import { deleteTaskById } from '../util/database';

export default function Home() {
  const [tasks, setTasks] = useState(['']);

  async function deleteTask(id: number) {
    const deleteResponse = await fetch(`/api/tasks/${id}`, {
      method: 'DELETE',
    });
    const deleteResponseBody = await deleteResponse.json();
  }

  const newTaskList = tasks.filter((task) => {
    return deleteResponseBody.task.id !== task.id;
  });

  setTasks(newTaskList);

  useEffect(() => {
    const getTasks = async () => {
      const readResponse = await fetch('/api/tasks');
      const readResponseBody = await readResponse.json();
      setTasks(readResponseBody.tasks);
    };
    getTasks().catch(() => {});
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>TEST</title>
        <meta name="testing" content="test test test" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>TEST</h1>
        <br />

        <h1>here we have the test list</h1>
        {tasks.map((task) => (
          <Fragment key={task.id}>
            <br />{' '}
            <div>
              {task.name}
              {task.points}
            </div>{' '}
            <button
              onClick={() => {
                deleteTask(task.id).catch(() => {});
              }}
            >
              Task DONE!
            </button>
          </Fragment>
        ))}
      </main>
    </div>
  );
}
