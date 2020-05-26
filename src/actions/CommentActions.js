import axios from "axios"
import { COMMENT_POST, COMMENT_FETCH } from "./types"

export const commentPost = (comment, id) => {
    return dispatch => {
        axios.post("http://localhost:5000/comments", comment).then(
            res => {
                axios.get("http://localhost:5000/comments/" + id).then(
                    res => {
                        dispatch({ type: COMMENT_POST, payload: res.data })
                    }
                )
            }
        )
    }
}

export const commentFetch = (id) => {
    return dispatch => {
        axios.get("http://localhost:5000/comments/" + id).then(
            res => {
                dispatch({ type: COMMENT_FETCH, payload: res.data })
            }
        )
    }
}