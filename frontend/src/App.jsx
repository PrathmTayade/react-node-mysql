import { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import "./App.css";
import { getAllTodos, updateTodo, deleteTodo } from "./api";
import { Container } from "@mui/material";

function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Track API loading state
  const [error, setError] = useState(null); // Store any API errors

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true); // Set loading state to true
      setError(null); // Clear any previous errors

      try {
        const fetchedTodos = await getAllTodos();
        setTodos(fetchedTodos);
      } catch (error) {
        console.error("Error fetching todos:", error);
        setError(error); // Store the error for display
      } finally {
        setIsLoading(false); // Set loading state to false after request completes
      }
    };

    fetchTodos();
  }, []);

  const handleTodoAdded = async (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  const handleTodoUpdate = async (id, completed) => {
    try {
      const updatedTodo = await updateTodo(id, completed);
      setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
    } catch (error) {
      console.error("Error updating todo:", error);
      setError(error);
    }
  };

  const handleTodoDelete = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
      setError(error); // Store the error for display
    }
  };

  return (
    <div className="App">
      <Container maxWidth="md">
        {isLoading && <p>Loading todos...</p>}
        {error && <p>Error: {error.message}</p>}
        <TodoForm onTodoAdded={handleTodoAdded} />
        <TodoList
          todos={todos}
          onTodoUpdate={handleTodoUpdate}
          onTodoDelete={handleTodoDelete}
        />
      </Container>
    </div>
  );
}

export default App;
