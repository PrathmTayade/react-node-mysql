import express from "express";
const router = express.Router();

// Import controller functions from todoController.js
import {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  getTodo,
} from "../controllers/todoController.js";

router.get("/todos", async (req, res) => {
  try {
    const todos = await getAllTodos();
    res.json(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/todos", async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).send("Please provide a text for the todo item");
  }

  try {
    const newTodo = await createTodo(text);
    res.status(201).json(newTodo); // Created status code
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/todos/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send("Please provide a id for the todo item");
  }
  try {
    const todo = await getTodo(id);
    if (!todo) {
      res.status(404).send("Todo item not found");
    }
    res.json(todo);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  if (completed === undefined) {
    return res
      .status(400)
      .send("Please provide a completed property (true or false)");
  }

  try {
    const updatedTodo = await updateTodo(id, completed);
    res.json(updatedTodo);
  } catch (error) {
    if (error.message === "Todo item not found") {
      return res.status(404).send("Todo item not found");
    }
    console.error("Error updating todo:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await deleteTodo(id);
    res.json({ message: "Todo item deleted" });
  } catch (error) {
    if (error.message === "Todo item not found") {
      return res.status(404).send("Todo item not found");
    }
    console.error("Error deleting todo:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
