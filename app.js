require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json()); //For data in/out
app.use(cors()); //For cross origin requests

let todos = [
// In-Memory Data: Array of Objects
{ id: 1, task: 'Finish Week 4 slides', completed: false },
{ id: 2, task: 'Deploy API (today!)', completed: true },
];

// GET ALL
app.get('/todos', (req, res) => res.status(200).json(todos));

// POST New
app.post('/todos', (req, res) =>{
const { task } = req.body;
if (!task) return res.status(400).json({ error: 'Task required' });
const newTodo = { id: todos.length + 1, task, completed: false };
todos.push(newTodo);
res.status(201).json(newTodo);
});

// GET One
app.get('/todos/:id', (req, res) =>{
const id = parseInt(req.params.id);
const todo = todos.find((t) => t.id == id);
if (!todo) return res.status(404).json({ error: 'Not found' });
res.status(200) .json(todo);
});

// PATCH Update
app.patch('/todos/:id', (req, res) => {
const id = parseInt(req.params.id);
const todo = todos.find((t) => t.id == id);
if (!todo) return res.status(404).json({ error: 'Not found' });
Object.assign(todo, req.body);
res.status(200).json(todo);
});

// DELETE
app.delete('/todos/:id', (req, res) => {
const id = parseInt(req.params.id);
const lenBefore = todos.length;
todos = todos.filter((t) => t.id !== id);
if (todos.length === lenBefore)
return res.status(404).json({ error: 'Not found' });
res.status(204).send();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API alive on ${PORT}`));

