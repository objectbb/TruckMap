import { RETRIEVE_INTERESTS } from "../actions";

export const interests = (
    state = {},
    action
) => {
    switch (action.type) {
    case RETRIEVE_INTERESTS:
        return {
            ...state
        };
    default:
        return state;
    }
};