import axios from "../axios";
import { GET_ERRORS, GET_PROJECTS, GET_PROJECT, DELETE_PROJECT } from "./types";

export const createProject = (project, history) => async (dispatch) => {
    try {
        const response = await axios.post("/api/project", project);
        history.push("/dashboard");
        dispatch({
            type: GET_ERRORS,
            payload: {},
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data,
        });
    }
};

export const getProjects = () => async (dispatch) => {
    const response = await axios.get("/api/project");
    dispatch({
        type: GET_PROJECTS,
        payload: response.data,
    });
};

export const getProject = (id, history) => async (dispatch) => {
    const response = await axios.get(`/api/project/${id}`);
    dispatch({
        type: GET_PROJECT,
        payload: response.data,
    });
};

export const deleteProject = (id) => async (dispatch) => {
    if (window.confirm("Are you sure?")) {
        let response;
        try {
            response = await axios.delete(`/api/project/${id}`);
            dispatch({
                type: DELETE_PROJECT,
                payload: id,
            });
        } catch (err) {
            console.log(response);
        }
    }
};
