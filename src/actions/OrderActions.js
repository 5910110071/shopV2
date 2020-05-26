import axios from "axios"
import { ORDERS_FETCH, ORDER_ADD, ORDER_DELETE, ORDER_POST, ORDER_CANCEL, ORDERS_WAIT_PAYMENT, ORDERS_PAYMENT, ORDER_PAYMENT_FETCH, ORDER_RESET, ORDERS_PAID, ORDERS_PAID_DELETE, ORDERS_PAYMENT_STATUS_UPDATE } from "./types"
/*
export const ordersPost = ({ orders, totalPrice }) => { // ตอนนี้ทุก order จะส่งมาที่เดียวกันเพราะยังมีการการ login เพื่อระบุตัวตน user
    return dispatch => {
        axios.post("http://localhost:3002/orders", { orderDate: new Date(), totalPrice, orders , status : "รอชำระเงิน" }).then( //ต้องแก้โดยการส่งไปที่ DB ของ user แต่ละคน หลังจากนั้นจะดึง ข้อมูลของ User แต่ละคนมาแสดงว่ายืนยันรายการอะไรไปแล้วมั้ง 
            res => {
                dispatch({ type: ORDER_POST, payload: res.data })
            }
        )
    }
}
 */
export const ordersWaitPaymentFetch = (id) => { // ตอนนี้ทุก order จะส่งมาที่เดียวกันเพราะยังมีการการ login เพื่อระบุตัวตน user
    return dispatch => {
        axios.get("http://localhost:5000/orders/" + id).then( //ต้องแก้โดยการส่งไปที่ DB ของ user แต่ละคน หลังจากนั้นจะดึง ข้อมูลของ User แต่ละคนมาแสดงว่ายืนยันรายการอะไรไปแล้วมั้ง 
            res => {
                dispatch({ type: ORDERS_WAIT_PAYMENT, payload: res.data })
            }
        )
    }
}

export const ordersPaidFetch = (id) => { // ตอนนี้ทุก order จะส่งมาที่เดียวกันเพราะยังมีการการ login เพื่อระบุตัวตน user
    console.log("id", id)
    if (id == "PoK3aDRlXeYhtHWBg1sMYSZIOHo1") {
        return dispatch => {
            axios.get("http://localhost:5000/orders/").then( //ต้องแก้โดยการส่งไปที่ DB ของ user แต่ละคน หลังจากนั้นจะดึง ข้อมูลของ User แต่ละคนมาแสดงว่ายืนยันรายการอะไรไปแล้วมั้ง 
                res => {
                    dispatch({ type: ORDERS_PAID, payload: res.data })
                }
            )
        }
    }
    else {
        return dispatch => {
            axios.get("http://localhost:5000/orders/" + id).then( //ต้องแก้โดยการส่งไปที่ DB ของ user แต่ละคน หลังจากนั้นจะดึง ข้อมูลของ User แต่ละคนมาแสดงว่ายืนยันรายการอะไรไปแล้วมั้ง 
                res => {
                    dispatch({ type: ORDERS_PAID, payload: res.data })
                }
            )
        }
    }

}

export const orderPaidDelete = (id, uid) => {
    return dispatch => {
        axios.delete("http://localhost:5000/order/" + id).then(
            res => {
                axios.get("http://localhost:5000/orders/" + uid).then(
                    res => {
                        dispatch({ type: ORDERS_PAID_DELETE, payload: res.data })
                    }
                )
            }
        )
    }
}

export const ordersPaymentPut = (id, values) => {
    console.log("id", id)
    return dispatch => {
        axios.put("http://localhost:5000/order/" + id, values).then(res => {
            dispatch({ type: ORDERS_PAYMENT });
        })
    }
}

export const ordersPaymentStatusPut = (id, values, uid) => {
    if (uid == "PoK3aDRlXeYhtHWBg1sMYSZIOHo1") {
        return dispatch => {
            axios.put("http://localhost:5000/order/" + id, values).then(res => {
                axios.get("http://localhost:5000/orders/").then( //ต้องแก้โดยการส่งไปที่ DB ของ user แต่ละคน หลังจากนั้นจะดึง ข้อมูลของ User แต่ละคนมาแสดงว่ายืนยันรายการอะไรไปแล้วมั้ง 
                    res => {
                        dispatch({ type: ORDERS_PAID, payload: res.data })
                    }
                )
            })
        }
    }
    else {
        return dispatch => {
            axios.put("http://localhost:5000/order/" + id, values).then(res => {
                axios.get("http://localhost:5000/orders/" + uid).then( //ต้องแก้โดยการส่งไปที่ DB ของ user แต่ละคน หลังจากนั้นจะดึง ข้อมูลของ User แต่ละคนมาแสดงว่ายืนยันรายการอะไรไปแล้วมั้ง 
                    res => {
                        dispatch({ type: ORDERS_PAID, payload: res.data })
                    }
                )
            })
        }
    }

}

export const orderPaymentFetch = (id) => { // ตอนนี้ทุก order จะส่งมาที่เดียวกันเพราะยังมีการการ login เพื่อระบุตัวตน user
    return dispatch => {
        axios.get("http://localhost:5000/order/" + id).then( //ต้องแก้โดยการส่งไปที่ DB ของ user แต่ละคน หลังจากนั้นจะดึง ข้อมูลของ User แต่ละคนมาแสดงว่ายืนยันรายการอะไรไปแล้วมั้ง 
            res => {
                dispatch({ type: ORDER_PAYMENT_FETCH, payload: res.data })
            }
        )
    }
}
// export const ordersPaymentFetch = () => { // ตอนนี้ทุก order จะส่งมาที่เดียวกันเพราะยังมีการการ login เพื่อระบุตัวตน user
//     return dispatch => {
//         axios.get("http://localhost:3002/orders").then( //ต้องแก้โดยการส่งไปที่ DB ของ user แต่ละคน หลังจากนั้นจะดึง ข้อมูลของ User แต่ละคนมาแสดงว่ายืนยันรายการอะไรไปแล้วมั้ง 
//             res => {
//                 dispatch({ type: ORDERS_PAYMENT, payload: res.data })
//             }
//         )
//     }
// }


/*
export const ordersFetch = () => {
    return dispatch => {
        dispatch({ type: ORDERS_FETCH })
    }
}
*/
export const ordersReset = () => {
    return dispatch => {
        dispatch({ type: ORDER_RESET })
    }
}

/*
export const orderCancel = product => {
    return dispatch => {
        dispatch({ type: ORDER_CANCEL, payload: product })
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
/*export const orderDelete = id => {
    return dispatch => {
        axios.delete("http://localhost:3001/orders/" + id).then(
            res => {
                axios.get("http://localhost:3001/orders").then(
                    res => {
                        dispatch({ type: ORDERS_FETCH, payload: res.data })
                    }
                )
            }
        )
    }
}
*/

/*
export const orderPost = (orders) => {
    return dispatch => {
        axios.post("http://localhost:3002/orders",{ orderDate: new Date(), totalPrice, orders }).then(
            res => {
                dispatch({ type: ORDERS_FETCH, payload: res.data })
            }
        )
    }
}
*/
