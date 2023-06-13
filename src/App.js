import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Container from "@mui/material/Container";
import TaskList from "./components/TaskList";

export const URL = process.env.REACT_APP_SERVER_URL;

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline>
        <Container>
          <TaskList />
          <ToastContainer />
        </Container>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
