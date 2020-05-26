import axios from "axios"
import { CATEGORIES_FETCH } from "./types"

export const categoriesFetch = () => {
    return dispatch => {
        axios.get("http://localhost:5000/category").then(
            res => {
                dispatch({ type: CATEGORIES_FETCH, payload: res.data })
            } 
        )
    }
}