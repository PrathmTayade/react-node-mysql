import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const TodoList = ({ todos, onTodoUpdate, onTodoDelete }) => {
  return (
    <List>
      {todos.map((todo) => (
        <ListItem
          key={todo.id}
          secondaryAction={
            <IconButton onClick={() => onTodoDelete(todo.id)}>
              <DeleteIcon />
            </IconButton>
          }
        >
          <Checkbox
            checked={todo.completed}
            onChange={() => onTodoUpdate(todo.id, !todo.completed)}
          />
          <ListItemText primary={todo.text} />
        </ListItem>
      ))}
    </List>
  );
};

export default TodoList;
