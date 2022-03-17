import { config } from 'dotenv-safe';
import postgres from 'postgres';
import camelcaseKeys from 'camelcase-keys';

config();

const sql = postgres;

export async function getTasks() {
  const tasks = await sql`
SELECT * FROM tasks`;
  return tasks.map((task) => camelcaseKeys(task));
}
