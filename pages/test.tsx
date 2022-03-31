import Head from 'next/head';
import { Fragment, useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import { Task } from '../util/database';

export default function Test() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<Task>();
  const [name, setName] = useState('');
  const [points, setPoints] = useState(Number);

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
      </main>
    </div>
  );
}
