import React, { useEffect, useState } from "react";
import { getProject, createProject } from "../../actions/projectActions";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";

const UpdateProject = ({
    project,
    getProject,
    history,
    match,
    createProject,
    errors,
}) => {
    const [projectName, setProjectName] = useState("");
    const [id, setId] = useState("");
    const [projectIdentifier, setProjectIdentifier] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [error, setError] = useState({});
    useEffect(() => {
        const { id } = match.params;
        getProject(id, history);
    }, []);
    useEffect(() => {
        if (Object.keys(errors).length !== 0) {
            setError(errors);
            return;
        }
        if (Object.keys(project).length !== 0) {
            const {
                id,
                projectName,
                projectIdentifier,
                description,
                startDate,
                endDate,
            } = project;
            setId(id);
            setProjectName(projectName);
            setProjectIdentifier(projectIdentifier);
            setDescription(description);
            setStartDate(startDate);
            setEndDate(endDate);
        }
    }, [Object.keys(project).length, Object.keys(errors).length]);

    const onSubmit = (e) => {
        e.preventDefault();
        createProject(
            {
                id: id,
                projectName: projectName,
                projectIdentifier: projectIdentifier,
                description: description,
                start_date: startDate,
                end_date: endDate,
            },
            history
        );
    };

    const spinner = (
        <div className="d-flex justify-content-center mt">
            <div className="spinner-border text-primary" role="status"></div>
        </div>
    );
    const context = (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <input type="text" value={id} className="d-none" />
                <input
                    type="text"
                    className={classnames("form-control form-control-lg ", {
                        "is-invalid": error.projectName,
                    })}
                    placeholder="Project Name"
                    name="projectName"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                />
                {error.projectName && (
                    <div className="invalid-feedback">{error.projectName}</div>
                )}
            </div>
            <div className="form-group">
                <input
                    type="text"
                    className={classnames("form-control form-control-lg ", {
                        "is-invalid": error.projectIdentifier,
                    })}
                    placeholder="Unique Project ID"
                    disabled
                    name="projectIdentifier"
                    value={projectIdentifier}
                    onChange={(e) => setProjectIdentifier(e.target.value)}
                />
                {error.projectIdentifier && (
                    <div className="invalid-feedback">
                        {error.projectIdentifier}
                    </div>
                )}
            </div>
            <div className="form-group">
                <textarea
                    className={classnames("form-control form-control-lg ", {
                        "is-invalid": error.description,
                    })}
                    placeholder="Project Description"
                    value={description}
                    name="description"
                    onChange={(e) => setDescription(e.target.value)}
                />
                {error.description && (
                    <div className="invalid-feedback">{error.description}</div>
                )}
            </div>
            <h6>Start Date</h6>
            <div className="form-group">
                <input
                    type="date"
                    className={classnames("form-control form-control-lg ", {
                        "is-invalid": error.start_date,
                    })}
                    name="start_date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
                {error.start_date && (
                    <div className="invalid-feedback">{error.start_date}</div>
                )}
            </div>
            <h6>Estimated End Date</h6>
            <div className="form-group">
                <input
                    type="date"
                    className={classnames("form-control form-control-lg ", {
                        "is-invalid": error.end_date,
                    })}
                    name="end_date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
                {error.end_date && (
                    <div className="invalid-feedback">{error.end_date}</div>
                )}
            </div>

            <button type="submit" className="btn btn-primary btn-block mt-4">
                Submit
            </button>
        </form>
    );
    return (
        <div className="project">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h5 className="display-4 text-center">
                            Update Project form
                        </h5>
                        <hr />
                        {Object.keys(project).length !== 0 ? context : spinner}
                    </div>
                </div>
            </div>
        </div>
    );
};
UpdateProject.propTypes = {
    getProject: PropTypes.func.isRequired,
    project: PropTypes.object.isRequired,
    createProject: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    project: state.project.project,
    errors: state.errors,
});
export default connect(mapStateToProps, { getProject, createProject })(
    UpdateProject
);
