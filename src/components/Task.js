import Box from "@mui/material/Box";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const Task = ({ task, index, deleteTask, setCompleted, getSingleTask }) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={1}
      height="60px"
      border="1px solid"
      borderRadius="5px"
      borderColor={task.completed === true ? "green" : "red"}
    >
      <Box component="div" ml={1}>
        <b>{index + 1}.</b> {task.name}
      </Box>
      <Box component="div">
        <DoneAllIcon
          color="success"
          sx={{ marginRight: "5px" }}
          onClick={() => {
            setCompleted(task._id);
          }}
        />
        <EditCalendarIcon
          color="secondary"
          sx={{ marginRight: "5px" }}
          onClick={() => {
            getSingleTask(task);
          }}
        />
        <DeleteForeverIcon
          color="error"
          sx={{ marginRight: "5px" }}
          onClick={() => {
            deleteTask(task._id);
          }}
        />
      </Box>
    </Box>
  );
};

export default Task;
