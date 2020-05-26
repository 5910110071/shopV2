import axios from "axios"
import { SET_USER, GET_USER, RESET_USER } from "./types"

/*
export const ordersPost = ({ orders, totalPrice }) => { // ตอนนี้ทุก order จะส่งมาที่เดียวกันเพราะยังมีการการ login เพื่อระบุตัวตน user
    console.log("orders",orders)
    orders = orders.filter(order => order.confirm == true);
    return dispatch => {
        axios.post("http://localhost:3002/orders", { orderDate: new Date(), totalPrice, orders, status: "รอชำระเงิน" }).then( //ต้องแก้โดยการส่งไปที่ DB ของ user แต่ละคน หลังจากนั้นจะดึง ข้อมูลของ User แต่ละคนมาแสดงว่ายืนยันรายการอะไรไปแล้วมั้ง 
            res => {
                dispatch({ type: ORDER_POST, payload: res.data })
            }
        )
    }
}
*/

export const setUser = (user) => {
    console.log("setUser",user)
    return dispatch => {
        axios.post("http://localhost:5000/users",user).then( //ต้องแก้โดยการส่งไปที่ DB ของ user แต่ละคน หลังจากนั้นจะดึง ข้อมูลของ User แต่ละคนมาแสดงว่ายืนยันรายการอะไรไปแล้วมั้ง 
            res => {
                dispatch({ type: SET_USER, payload: res.data })
            }
        )
    }
}

export const getUser = (user_id) => {
    return dispatch => {
        axios.get("http://localhost:5000/user/" + user_id).then( //ต้องแก้โดยการส่งไปที่ DB ของ user แต่ละคน หลังจากนั้นจะดึง ข้อมูลของ User แต่ละคนมาแสดงว่ายืนยันรายการอะไรไปแล้วมั้ง 
            res => {
                dispatch({ type: GET_USER, payload: res.data })
            }
        )
    }
}

// export const getUser2 = (id) => {
//     return dispatch => {
//         axios.get("http://localhost:5000/userbyid/" + id).then( //ต้องแก้โดยการส่งไปที่ DB ของ user แต่ละคน หลังจากนั้นจะดึง ข้อมูลของ User แต่ละคนมาแสดงว่ายืนยันรายการอะไรไปแล้วมั้ง 
//             res => {
//                 dispatch({ type: GET_USER, payload: res.data })
//             }
//         )
//     }
// }

export const resetUser = () => {
    return dispatch => {
        dispatch({ type: RESET_USER })
    }
}

/*
export const orderCancel = product => {
    return dispatch => {
        dispatch({ type: ORDER_CANCEL, payload: product })
    }
}

export const orderConfirm = product => {
    return dispatch => {
        dispatch({ type: ORDER_CONFIRM, payload: product })
    }
}

export const orderAdd = (product) => {
    return dispatch => {
        dispatch({ type: ORDER_ADD, payload: product })
    }
}

export const orderDelete = id => {
    return dispatch => {
        dispatch({ type: ORDER_DELETE, payload: id })
    }
}

*/