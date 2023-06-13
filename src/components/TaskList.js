import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import axios from "axios";
import TaskForm from "./TaskForm";
import { useEffect, useState } from "react";
import Task from "./Task";
import { toast } from "react-toastify";
import { URL } from "../App";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [taskID, setTaskID] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    completed: false,
  });

  const { name } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Get all tasks
  const getTasks = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${URL}/api/tasks`);
      setTasks(data);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  // Get all tasks on startup
  useEffect(() => {
    getTasks();
  }, []);

  // Get completed tasks
  useEffect(() => {
    const cTask = tasks.filter((task) => {
      return task.completed === true;
    });
    setCompletedTasks(cTask);
  }, [tasks]);

  // Create task
  const createTask = async (e) => {
    e.preventDefault();
    if (name === "") {
      return toast.error("Input field cannot be empty");
    }

    try {
      await axios.post(`${URL}/api/tasks/`, formData);
      setFormData({ ...formData, name: "" });
      getTasks();
      toast.success("Task added successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${URL}/api/tasks/${id}`);
      getTasks();
      toast.success(`Task successfully deleted`);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  // Get single task
  const getSingleTask = (task) => {
    setFormData({ name: task.name, completed: false });
    setIsEditing(true);
    setTaskID(task._id);
  };

  // Update task
  const updateTask = async (e) => {
    e.preventDefault();
    if (name === "") {
      return toast.error("Input field cannot be empty");
    }
    try {
      setIsLoading(true);
      await axios.put(`${URL}/api/tasks/${taskID}`, formData);
      setIsLoading(false);
      setFormData({ ...formData, name: "" });
      setIsEditing(false);
      setTaskID("");
      getTasks();
      toast.success("Task updated successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Set task to completed
  const setCompleted = async (id) => {
    try {
      await axios.patch(`${URL}/api/tasks/${id}`, { completed: true });
      getTasks();
      toast.success(`Task successfully set to Completed`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Box>
      <Typography variant="h4" mt={4}>
        Task Manager
      </Typography>
      <TaskForm
        createTask={createTask}
        updateTask={updateTask}
        isEditing={isEditing}
        name={name}
        handleInputChange={handleInputChange}
      />
      {tasks.length > 0 && (
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Box component="div">
            <Typography variant="subtitle2">
              <b>Total Tasks:</b> {tasks.length}
            </Typography>
          </Box>
          <Box component="div">
            <Typography variant="subtitle2">
              <b>Completed Tasks:</b> {completedTasks.length}
            </Typography>
          </Box>
        </Box>
      )}

      {/* {isLoading && <CircularProgress />} */}
      {!isLoading && tasks.length === 0 ? (
        <p>No task added. Please add a task</p>
      ) : (
        <>
          {tasks.map((task, i) => {
            return (
              <Task
                key={task._id}
                task={task}
                index={i}
                deleteTask={deleteTask}
                setCompleted={setCompleted}
                getSingleTask={getSingleTask}
              />
            );
          })}
        </>
      )}
    </Box>
  );
};

export default TaskList;
