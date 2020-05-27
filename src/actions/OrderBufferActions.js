import axios from "axios"
import { ORDERS_FETCH, ORDER_ADD, ORDER_DELETE, ORDER_POST, ORDER_CANCEL, ORDER_CONFIRM, ORDERS_WAIT_PAYMENT, ORDERS_PAYMENT, ORDER_PAYMENT_FETCH, ORDER_RESET, ORDERS_PAID, ORDERS_PAID_DELETE, ORDER_BUFFER } from "./types"

export const ordersPost = ({ orders, totalPrice }, user) => { // ตอนนี้ทุก order จะส่งมาที่เดียวกันเพราะยังมีการการ login เพื่อระบุตัวตน user
    console.log("user", user)
    orders = orders.filter(order => order.confirm == true);
    return dispatch => {
        axios.post("http://localhost:5000/orders", { orderDate: new Date(), totalPrice, orders, status: "รอชำระเงิน", user_name: user.user_name, user_id: user.id, user_address: user.user_address, user_tel: user.user_tel }).then( //ต้องแก้โดยการส่งไปที่ DB ของ user แต่ละคน หลังจากนั้นจะดึง ข้อมูลของ User แต่ละคนมาแสดงว่ายืนยันรายการอะไรไปแล้วมั้ง 
            res => {
                dispatch({ type: ORDER_POST, payload: res.data })
            }
        )
    }
} 

export const ordersFetch = () => {
    return dispatch => {
        dispatch({ type: ORDERS_FETCH })
    }
}


export const orderCancel = product => {
    return dispatch => {
        dispatch({ type: ORDER_CANCEL, payload: product })
    }
}

export const orderConfirm = (product, saleman_id) => {

    return dispatch => {
        dispatch({ type: ORDER_CONFIRM, payload: { product, saleman_id } })
    }
}

// export const orderConfirm2 = (product, saleman_id, user, quantity) => {// เพิ่ม user_id
//     return dispatch => {
//         axios.get("http://localhost:5000/basket/" + user.id).then(
//             res => {
//                 if (res.data != null) {
//                     let findOrder = res.data.orders.find(order => order.product.product_id == product.product_id);
//                     if (findOrder) {
//                         findOrder.quantity += quantity;
//                         res.data.totalPrice += findOrder.quantity * product.product_price
//                     }
//                     else {
//                         res.data.orders.push({ product: product, quantity: quantity });
//                         res.data.totalPrice += quantity * product.product_price
//                     }
//                     axios.put("http://localhost:5000/basket/" + user.id, res.data).then(
//                         res => {
//                             dispatch({ type: ORDER_POST2, payload: res.data })
//                         }
//                     )
//                 }
//                 else {
//                     axios.post("http://localhost:5000/basket", { orderDate: new Date(), totalPrice: quantity * product.product_price, orders: [{ product: product, quantity: quantity }], status: "รอชำระเงิน", user_name: user.user_name, user_id: user.id, user_address: user.user_address, user_tel: user.user_tel }).then( //ต้องแก้โดยการส่งไปที่ DB ของ user แต่ละคน หลังจากนั้นจะดึง ข้อมูลของ User แต่ละคนมาแสดงว่ายืนยันรายการอะไรไปแล้วมั้ง 
//                         res => {
//                             dispatch({ type: ORDER_POST2, payload: res.data })
//                         }
//                     )
//                 }
//             }
//         )
//     }
// }



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

