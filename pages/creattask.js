import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import styles from '../styles/Home.module.css';
import { handler } from './api/tasks';

export default function CreatList() {
  const [todo, setTodo] = useState([]);
  function handleToddo() {
    setTodo(todo);
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Creat Task</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Creat Task</h1>
        <div>
          <input
            className={styles.input}
            id="To-Do"
            placeholder="what do you want to do?"
          />
        </div>
        <button onClick={() => handleToddo()} className={styles.button}>
          add task
        </button>
        <button className={styles.button}>
          <Link href="/player">Find your tasks</Link>
        </button>
      </main>
    </div>
  );
}
