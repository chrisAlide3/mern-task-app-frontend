import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const ariaLabel = { "aria-label": "Task Input" };

const TaskForm = ({
  createTask,
  updateTask,
  isEditing,
  name,
  handleInputChange,
}) => {
  return (
    <Box
      component="form"
      onSubmit={isEditing ? updateTask : createTask}
      display="flex"
      mt={5}
      mb={3}
      noValidate
      autoComplete="off"
    >
      <TextField
        name="name"
        value={name}
        placeholder="Add a task"
        fullWidth
        inputProps={ariaLabel}
        onChange={handleInputChange}
      />
      <Button color="secondary" variant="contained" size="large" type="submit">
        {isEditing ? "Edit" : "Add"}
      </Button>
    </Box>
  );
};

export default TaskForm;
