import axios from "axios"
import { BASKET_POST } from "./types"



export const orderConfirm2 = (product, saleman_id, user, quantity) => {// เพิ่ม user_id
    return dispatch => {
        axios.get("http://localhost:5000/basket/" + user.id).then(
            res => {
                if (res.data != null) {
                    let findOrder = res.data.orders.find(order => order.product.product_id == product.product_id);
                    if (findOrder) {
                        if (findOrder.quantity + quantity <= findOrder.product.product_inventory) {
                            res.data.overflow = false
                            findOrder.quantity += quantity;
                            res.data.totalPrice += quantity * product.product_price
                            console.log("here555555555555555555555",findOrder.quantity)
                        }
                        else res.data.overflow = true
                    }
                    else {
                        res.data.orders.push({ product: product, quantity: quantity, saleman_id: saleman_id });
                        res.data.totalPrice += quantity * product.product_price
                        res.data.overflow = false
                    }
                    axios.put("http://localhost:5000/basket/" + user.id, res.data).then(
                        res => {
                            console.log("here555555555555555555555")
                            axios.get("http://localhost:5000/basket/" + user.id).then(
                                res => {
                                    dispatch({ type: BASKET_POST, payload: res.data })
                                }
                            )
                        }
                    )
                }
                else {
                    axios.post("http://localhost:5000/basket", { orderDate: new Date(), totalPrice: quantity * product.product_price, orders: [{ product: product, quantity: quantity, saleman_id: saleman_id }], status: "รอชำระเงิน", user_name: user.user_name, user_id: user.id, user_address: user.user_address, user_tel: user.user_tel}).then( //ต้องแก้โดยการส่งไปที่ DB ของ user แต่ละคน หลังจากนั้นจะดึง ข้อมูลของ User แต่ละคนมาแสดงว่ายืนยันรายการอะไรไปแล้วมั้ง 
                        res => {
                            console.log("here555555555555555555555",quantity)
                            axios.get("http://localhost:5000/basket/" + user.id).then(
                                res => {
                                    dispatch({ type: BASKET_POST, payload: res.data })
                                }
                            )
                        }
                    )
                }
            }
        )
    }
}

export const basketFetch = (id) => {// เพิ่ม user_id
    console.log("basketFetch", id)
    return dispatch => {
        axios.get("http://localhost:5000/basket/" + id).then(res => {
            dispatch({ type: BASKET_POST, payload: res.data })
        })
    }
}

export const basketPost = (formValues) => {// เพิ่ม user_id
    //console.log("basketFetch",id)
    return dispatch => {
        axios.post("http://localhost:5000/orders", formValues).then(res => {
            dispatch({ type: BASKET_POST, payload: res.data })
        })
    }
}

export const basketDelete = (id) => {
    return dispatch => {
        axios.delete("http://localhost:5000/basket/" + id).then(
            res => {
                axios.get("http://localhost:5000/basket/" + id).then(
                    res => {
                        dispatch({ type: BASKET_POST, payload: res.data })
                    }
                )
            }
        )
    }
}


export const basketDeleteProduct = (id, product_id, user_id) => {
    return dispatch => {

        axios.get("http://localhost:5000/basket/" + user_id).then(
            res => {
                let findOrder = res.data.orders.find(order => order.product.product_id == product_id);
                res.data.orders = res.data.orders.filter(order => order.product.product_id != product_id);
                if (res.data.orders.length == 0) {
                    axios.delete("http://localhost:5000/basket/" + id).then(
                        res => {
                            axios.get("http://localhost:5000/basket/" + id).then(
                                res => {


                                    dispatch({ type: BASKET_POST, payload: res.data })
                                }
                            )
                        }
                    )
                }
                else {

                    res.data.totalPrice -= findOrder.quantity * findOrder.product.product_price
                    console.log("res.data", res.data)
                    axios.put("http://localhost:5000/basket/" + user_id, res.data).then(
                        res => {
                            axios.get("http://localhost:5000/basket/" + user_id).then(
                                res => {
                                    dispatch({ type: BASKET_POST, payload: res.data })
                                }
                            )
                        }
                    )
                }
            }
        )
    }
}

export const basketEditQuantity = (product_id, user_id, op) => {
    return dispatch => {

        axios.get("http://localhost:5000/basket/" + user_id).then(
            res => {
                //console.log("res.data", res.data)
                let findOrder = res.data.orders.find(order => order.product.product_id == product_id);
                //console.log("findOrder", findOrder)
                //res.data.orders = res.data.orders.filter(order => order.product.product_id != product_id);
                //console.log("res.data.orders.length",res.data)
                if (op === "+") {
                    if (findOrder.quantity + 1 <= findOrder.product.product_inventory) {
                        findOrder.quantity++
                        res.data.totalPrice += findOrder.product.product_price
                    }
                }
                else if (op === "-") {
                    if (findOrder.quantity - 1 >= 1) {
                        findOrder.quantity--
                        res.data.totalPrice -= findOrder.product.product_price
                    }
                }
                axios.put("http://localhost:5000/basket/" + user_id, res.data).then(
                    res => {
                        axios.get("http://localhost:5000/basket/" + user_id).then(
                            res => {
                                dispatch({ type: BASKET_POST, payload: res.data })
                            }
                        )
                    }
                )
            }
        )
    }
}

