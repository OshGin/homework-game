const tasks = [
  {
    name: 'clean',
    points: 10,
  },
];

exports.up = async (sql) => {
  await sql`
    INSERT INTO tasks ${sql(tasks, 'name', 'poins')}
  `;
};

exports.down = async (sql) => {
  for (const task of tasks) {
    await sql`
      DELETE FROM
        tasks
      WHERE
        name = ${task.name} AND
        points = ${task.points}
    `;
  }
};
