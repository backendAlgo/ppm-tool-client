import { DELETE_PROJECT, GET_PROJECT, GET_PROJECTS } from "../actions/types";

const initialState = {
    projects: [],
    project: {},
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_PROJECTS:
            return {
                ...state,
                project: {},
                projects: action.payload,
            };
        case GET_PROJECT:
            return {
                ...state,
                project: action.payload,
            };
        case DELETE_PROJECT:
            return {
                ...state,
                projects: state.projects.filter(
                    (project) => project.projectIdentifier !== action.payload
                ),
            };
        default:
            return state;
    }
};
