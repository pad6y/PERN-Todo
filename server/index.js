const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
//create todo

app.post('/todos', async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      'INSERT INTO todo(description) VALUES($1) RETURNING *',
      [description]
    );

    res.json(newTodo.rows[0]);
  } catch (e) {
    res.send(e.message);
  }
});

//get all todo

app.get('/todos', async (req, res) => {
  try {
    const todos = await pool.query('SELECT * FROM todo ORDER BY todo_id ASC');
    res.json(todos.rows);
  } catch (e) {
    res.send(e.message);
  }
});

//get a todo
app.get('/todos/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const todo = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [
      id,
    ]);
    res.json(todo.rows[0]);
  } catch (e) {
    res.send(e.message);
  }
});

//update todo
app.put('/todos/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { description } = req.body;
    await pool.query('UPDATE todo SET description = $1 WHERE todo_id = $2', [
      description,
      id,
    ]);

    const todo = await pool.query('SELECT * FROM todo WHERE todo_id = ($1)', [
      id,
    ]);
    res.json(todo.rows[0]);
  } catch (e) {
    res.send(e.message);
  }
});

//delete todo
app.delete('/todos/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await pool.query('DELETE FROM todo WHERE todo_id = $1', [id]);
    res.send(`DELETED TODO with the ID of ${id}`);
  } catch (e) {
    res.send(e.message);
  }
});

app.listen(5000, () => {
  console.log('listening on port 5000');
});
