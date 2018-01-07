import thunkMiddleware from "redux-thunk"
import { compose, createStore, applyMiddleware } from "redux"
import { combineReducers } from "redux"
import { region } from "./region"
import { request } from "./request"
import { people } from "./people"
import { interests } from "./interests"


const rootReducer = combineReducers({
    region,
    request,
    people,
    interests
})

let store = createStore(
    rootReducer,
    compose(
        applyMiddleware(
            thunkMiddleware // lets us dispatch() functions
        )
    )
)

export default store