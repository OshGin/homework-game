import { config } from 'dotenv-safe';
import postgres from 'postgres';
import camelcaseKeys from 'camelcase-keys';

config();
// Type needed for the connection function below
declare module globalThis {
  let postgresSqlClient: ReturnType<typeof postgres> | undefined;
}
// Connect only once to the database
// https://github.com/vercel/next.js/issues/7811#issuecomment-715259370
function connectOneTimeToDatabase() {
  let sql;

  if (process.env.NODE_ENV === 'production' && process.env.DATABASE_URL) {
    sql = postgres();
    // Heroku needs SSL connections but
    // has an "unauthorized" certificate
    // https://devcenter.heroku.com/changelog-items/852
    sql = postgres({ ssl: { rejectUnauthorized: false } });
  } else {
    if (!globalThis.postgresSqlClient) {
      globalThis.postgresSqlClient = postgres();
    }
    sql = globalThis.postgresSqlClient;
  }
  return sql;
}

const sql = connectOneTimeToDatabase;

export type Task = {
  id: number;
  name: string;
  points: number;
};

export async function getTasks() {
  const tasks = await sql<Task[]>`
    SELECT * FROM animals;
  `;
  return tasks.map((task) => camelcaseKeys(task));
}

export async function creatTask(name: string, points: number) {
  const task = await sql<[Task]>`
INSERT INTO tasks
  (name, points)
VALUES
 (${name},${points})`;
  return camelcaseKeys(task);
}

export async function updateTaskById(name: string, points: number) {
  const task = await sql<[Task | undefined]>`
  UPDATE
    tasks
  SET
    name = ${name},
    points = ${points}
  `;
  return task && camelcaseKeys(task);
}

export async function deleteTaskById(id = Number) {
  const task = await sql<[Task | undefined]>`
  DELETE FROM
    tasks
  WHERE
    id = ${id}`;
  return task && camelcaseKeys(task);
}
