import Todo from "../models/todo.js";

async function getAllTodos(req, res) {
  try {
    const todos = await Todo.findAll();
    return todos;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
}

async function createTodo(text) {
  try {
    const newTodo = await Todo.create({ text });
    return newTodo;
  } catch (error) {
    console.error("Error creating todo:", error);
    throw error;
  }
}
async function getTodo(id) {
  try {
    const todo = await Todo.findByPk(id);
    if (!todo) {
      throw new Error("Todo item not found");
    }
    return todo;
  } catch (error) {
    console.error("Error creating todo:", error);
    return;
  }
}

async function updateTodo(id, completed) {
  try {
    const todo = await Todo.findByPk(id);
    if (!todo) {
      throw new Error("Todo item not found");
    }

    todo.completed = completed;
    await todo.save();
    return todo;
  } catch (error) {
    console.error("Error updating todo:", error);
    throw error;
  }
}

async function deleteTodo(id) {
  try {
    const deletedTodoCount = await Todo.destroy({
      where: {
        id: id,
      },
    });

    if (deletedTodoCount === 0) {
      throw new Error("Todo item not found");
    }

    return { message: "Todo item deleted" };
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }
}

export { getAllTodos, getTodo, createTodo, updateTodo, deleteTodo };
