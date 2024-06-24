import { useState } from "react";
import { TextField, Button, Container, Box } from "@mui/material";
import { createTodo } from "../api";
import { useTheme } from "@mui/material/styles"; // Import for theme access

const TodoForm = ({ onTodoAdded }) => {
  const theme = useTheme(); // Access theme for styling
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTodo = await createTodo(text);
    onTodoAdded(newTodo);
    setText("");
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <TextField
          value={text}
          onChange={(e) => setText(e.target.value)}
          label="New Todo"
          variant="outlined"
          size="small"
          sx={{ marginRight: theme.spacing(2) }}
        />
        <Button type="submit" variant="contained" color="primary">
          Add Todo
        </Button>
      </form>
    </Box>
  );
};

export default TodoForm;
