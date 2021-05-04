import React from 'react';
import NewProject from '../proyects/NewProject';
import ProjectList from "../proyects/ProjectList";

const Sidebar = () => {
    return (
        <aside>
            <h1>
                MERN<span>Client</span>
            </h1>
            <NewProject />
            <div className="proyectos">
                <h2>Tus Proyectos</h2>
                <ProjectList />
            </div>
        </aside>
    );
};

export default Sidebar;