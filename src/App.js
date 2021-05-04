import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Proyects from "./components/proyects/Proyects";
import ProjectState from "./context/projects/projectState";
import TaskState from "./context/tasks/taskState";
import AlertState from "./context/alerts/alertState";
import AuthState from "./context/auth/authState";
import tokenAuth from "./config/tokenAuth";
import PrivateRoute from "./components/routes/PrivateRoute";

const token = localStorage.getItem('token');
if(token) {
    tokenAuth(token);
}

function App() {
    return (
        <ProjectState>
            <TaskState>
                <AlertState>
                    <AuthState>
                        <Router>
                            <Switch>
                                <Route exact path="/" component={Login}></Route>
                                <Route exact path="/login" component={Login}></Route>
                                <Route
                                    exact
                                    path="/register"
                                    component={Register}
                                ></Route>
                                <PrivateRoute
                                    exact
                                    path="/projects"
                                    component={Proyects}
                                ></PrivateRoute>
                            </Switch>
                        </Router>
                    </AuthState>
                </AlertState>
            </TaskState>
        </ProjectState>
    );
}

export default App;
