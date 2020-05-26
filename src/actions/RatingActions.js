import axios from "axios"
import { RATING_FETCH } from "./types"

export const ratingFetch = (product_id, formValues) => {
    return dispatch => {
        axios.get("http://localhost:5000/rating/" + product_id).then(
            res => {
                console.log("Rating55555555555555555555", res.data)
                if (res.data == null) {
                    console.log("Here1", formValues.rating)
                    axios.post("http://localhost:5000/rating", { product_id: product_id, sum: formValues.rating, count: 1, average: formValues.rating }).then( //ต้องแก้โดยการส่งไปที่ DB ของ user แต่ละคน หลังจากนั้นจะดึง ข้อมูลของ User แต่ละคนมาแสดงว่ายืนยันรายการอะไรไปแล้วมั้ง 
                        res => {
                            axios.get("http://localhost:5000/rating/" + product_id).then(
                                res => {
                                    dispatch({ type: RATING_FETCH, payload: res.data })
                                }
                            )
                        }
                    )
                }
                else {
                    let value = {
                        product_id: product_id,
                        sum: (res.data.sum + formValues.rating),
                        count: res.data.count + 1,
                        average: (res.data.sum + formValues.rating) / (res.data.count + 1)
                    }
                    console.log("res.data.sum ", res.data.sum, "formValues.rating", formValues.rating)
                    axios.put("http://localhost:5000/rating/" + product_id, value).then(
                        res => {
                            axios.get("http://localhost:5000/rating/" + product_id).then(
                                res => {
                                    dispatch({ type: RATING_FETCH, payload: res.data })
                                }
                            )
                        }
                    )
                }
            }
        )
    }
}

export const ratingFetch2 = (product_id) => {
    console.log("ratingFetch2",product_id)
    return dispatch => {
        axios.get("http://localhost:5000/rating/" + product_id).then(
            res => {
                console.log("res.data",res.data)
                dispatch({ type: RATING_FETCH, payload: res.data })
            }
        )
    }
}

