import React, { useContext } from 'react';
import projectContext from "../../context/projects/projectContext";
import taskContext from "../../context/tasks/taskContext";

const ProjectItem = ({ project }) => {

    const projectsContext = useContext(projectContext);
    const {
        activeProject,
        setActiveProjectFn,
    } = projectsContext;

    const tasksContext = useContext(taskContext);
    const { getTaskListFn, showTaskFormErrorFn } = tasksContext;


    const { _id, name } = project;

    const selectProject = () => {
        setActiveProjectFn(project);
        getTaskListFn(_id);
        showTaskFormErrorFn(false);
    }

    return (
        <li
            className={`${
                activeProject !== null && _id === activeProject._id
                    ? "active"
                    : ""
            }`}
            onClick={selectProject}
        >
            
            {name}
        </li>
    );
};

export default ProjectItem;