import React, { useEffect } from "react";
import CreateProjectButton from "./Project/CreateProjectButton";
import ProjectItem from "./Project/ProjectItem";
import { connect } from "react-redux";
import { getProjects } from "../actions/projectActions";
import PropTypes from "prop-types";

const Dashboard = ({ projects, getProjects }) => {
    useEffect(() => {
        getProjects();
    }, []);

    return (
        <div className="projects">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="display-4 text-center">Projects</h1>
                        <br />
                        <CreateProjectButton />
                        <br />
                        <hr />
                        {projects.map((project) => (
                            <ProjectItem project={project} key={project.id} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

Dashboard.propTypes = {
    projects: PropTypes.array.isRequired,
    getProjects: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    projects: state.project.projects,
});

export default connect(mapStateToProps, { getProjects })(Dashboard);
