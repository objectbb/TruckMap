import { REQUEST_POSTS, RECEIVE_POSTS } from "../actions";

export const request = (
    state = {
        isFetching: false,
        items: []
    },
    action
) => {
    switch (action.type) {
    case REQUEST_POSTS:
        return {
            ...state,
            isFetching: true
        };
    case RECEIVE_POSTS:
        return {
            ...state,
            isFetching: false,
            items: action.posts,
            lastUpdated: action.receivedAt
        };
    default:
        return state;
    }
};