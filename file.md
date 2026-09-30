app.use(express.json());
app.use(cors('*'));

let todos = [
// In-Memory Data: Array of Objects
{ id: 1, task: 'Finish Week 4 slides', completed: false },
{ id: 2, task: 'Deploy API (today!)', completed: true },