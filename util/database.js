import { config } from 'dotenv-safe';
import postgres from 'postgres';
import camelcaseKeys from 'camelcase-keys';

config();

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

export async function getTasks() {
  const tasks = await sql`
SELECT * FROM tasks`;
  return tasks && camelcaseKeys(tasks);
}

export async function creatTask(name, points) {
  const task = await sql`
INSERT INTO tasks
  (name, points)
VALUES
 (${name},${points})`;
  return task && camelcaseKeys(task);
}

export async function updateTaskById(name, points) {
  const task = await sql`
  UPDATE
    tasks
  SET
    name = ${name},
    points = ${points}
  `;
  return task && camelcaseKeys(task);
}

export async function deleteTaskById(id) {
  const task = await sql`
  DELETE FROM
    tasks
  WHERE
    id = ${id}`;
  return task && camelcaseKeys(task);
}
