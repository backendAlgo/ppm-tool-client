import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProject } from "../../actions/projectActions";
import classnames from "classnames";

const AddProject = (props) => {
    const [projectName, setProjectName] = useState("");
    const [projectIdentifier, setProjectIdentifier] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [errors, setErrors] = useState({});

    const onSubmit = (e) => {
        e.preventDefault();
        const newProject = {
            projectName: projectName,
            projectIdentifier: projectIdentifier,
            description: description,
            start_date: startDate,
            end_date: endDate,
        };
        props.createProject(newProject, props.history);
    };

    useEffect(() => {
        setErrors(props.errors);
    }, [props.errors]);

    return (
        <div>
            <div className="project">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h5 className="display-4 text-center">
                                Create Project form
                            </h5>
                            <hr />
                            <form onSubmit={onSubmit}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className={classnames(
                                            "form-control form-control-lg",
                                            {
                                                "is-invalid":
                                                    errors.projectName,
                                            }
                                        )}
                                        placeholder="Project Name"
                                        name="projectName"
                                        value={projectName}
                                        onChange={(e) =>
                                            setProjectName(e.target.value)
                                        }
                                    />
                                    {errors.projectName && (
                                        <div className="invalid-feedback">
                                            {errors.projectName}
                                        </div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className={classnames(
                                            "form-control form-control-lg",
                                            {
                                                "is-invalid":
                                                    errors.projectIdentifier,
                                            }
                                        )}
                                        placeholder="Unique Project ID"
                                        name="projectIdentifier"
                                        value={projectIdentifier}
                                        onChange={(e) =>
                                            setProjectIdentifier(e.target.value)
                                        }
                                    />
                                    {errors.projectIdentifier && (
                                        <div className="invalid-feedback">
                                            {errors.projectIdentifier}
                                        </div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <textarea
                                        className="form-control form-control-lg"
                                        placeholder="Project Description"
                                        name="description"
                                        value={description}
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                    />
                                </div>
                                <h6>Start Date</h6>
                                <div className="form-group">
                                    <input
                                        type="date"
                                        className="form-control form-control-lg"
                                        name="start_date"
                                        value={startDate}
                                        onChange={(e) =>
                                            setStartDate(e.target.value)
                                        }
                                    />
                                </div>
                                <h6>Estimated End Date</h6>
                                <div className="form-group">
                                    <input
                                        type="date"
                                        className="form-control form-control-lg"
                                        name="end_date"
                                        value={endDate}
                                        onChange={(e) =>
                                            setEndDate(e.target.value)
                                        }
                                    />
                                </div>

                                <input
                                    type="submit"
                                    className="btn btn-primary btn-block mt-4"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
AddProject.propTypes = {
    createProject: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    errors: state.errors,
});
export default connect(mapStateToProps, { createProject })(AddProject);
