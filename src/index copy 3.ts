import express from "express";
import type { Request, Response } from "express";

const server = express();
const port = 3000;

let todos = [
  { id: 1, text: "h", isComplete: false },
  { id: 2, text: "k", isComplete: false },
];

server.use(express.json());

server.get("/", (req: Request, res: Response) => {
  res.send("ok");
});

server.get("/todos", (req: Request, res: Response) => {
  res.status(200).send(todos);
});

server.get("/todos/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  const task = todos.find((todo) => String(todo.id) === String(id));

  res.status(200).send(task);
});

server.post("/todos", (req: Request, res: Response) => {
  const { text, isComplete } = req.body;

  const newTaskId = todos.length + 1;

  const newTask = { id: newTaskId, text, isComplete };

  todos.push(newTask);

  res.status(200).send(todos);
});

server.put("/todos/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { text, isComplete } = req.body;

  todos = todos.map((todo) => {
    if (String(todo.id) === String(id)) {
      const updateTask = {
        id: todo.id,
        text: text,
        isComplete: isComplete,
      };

      return updateTask;
    } else {
      return todo;
    }
  });

  res.status(200).send(todos);
});

server.delete("/todos", (req: Request, res: Response) => {
  res.status(200).send(todos);
});

server.delete("/todos/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  const foundTask = todos.find((todo) => String(todo.id) === String(id));

  if (!foundTask) {
    res.status(404).json({ message: "not found" });
    return;
  }

  const deletedTask = todos.filter((todo) => String(todo.id) !== String(id));

  todos = deletedTask;

  res.status(200).json({ message: "Successfully" });
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
