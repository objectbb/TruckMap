const BASE_URL = "http://localhost:3001/api/"

let people = require("../data/people.json");
import { interests } from "../data/interests";

export const REQUEST_POSTS = "REQUEST_POSTS"
export const RECEIVE_POSTS = "RECEIVE_POSTS"
export const SET_CURRENT_REGION = "SET_CURRENT_REGION"


export const RETRIEVE_PEOPLE = "RETRIEVE_PEOPLE"
export const RETRIEVE_INTERESTS = "RETRIEVE_INTERESTS"

export const requestPosts = payload => ({
    type: REQUEST_POSTS,
    payload
})

export const receivePosts = (payload, json) => ({
    type: RECEIVE_POSTS,
    payload,
    posts: json,
    receivedAt: Date.now()
})

export const setCurrentRegion = region => ({
    type: REQUEST_CUSTOMER_PROPERTY_TRACKING,
    region
})

export const retrieveInterests = interests => ({
    type: RETRIEVE_INTERESTS,
    interests
})

export const retrievePeople = people => ({
    type: RETRIEVE_PEOPLE,
    people: people
})

const config = {
    method: "GET"
}

export const requestGeoCode = coords => dispatch => {
    dispatch(requestPosts(coords))
}

export const loadInterests = () => dispatch => {
    dispatch(retrieveInterests(interests()))
}

export const loadPeople = () => dispatch => {
    dispatch(retrievePeople(people))
}

function callApi(endpoint) {

    return fetch(BASE_URL + endpoint, config)
        .then(response => response.text().then(text => ({ text, response })))
        .then(({ text, response }) => {
            if (!response.ok) {
                return Promise.reject(text)
            }

            return text
        })
        .catch(err => console.log(err))
}