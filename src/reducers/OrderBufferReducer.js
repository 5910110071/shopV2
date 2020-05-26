import { ORDERS_FETCH, ORDER_ADD, ORDER_DELETE, ORDER_POST, ORDER_CANCEL, ORDER_CONFIRM } from "../actions/types"
export default function (state = { totalPrice: 0, orders: [], confirm: false, msg: '' }, action) {
    switch (action.type) {
        case ORDERS_FETCH:
            return state

        case ORDER_ADD:
            let findOrder = state.orders.find(order => order.product.product_id == action.payload.product_id);

            if (findOrder) {
                if (findOrder.confirm == true)
                    return state
                findOrder.quantity++;

            } else {
                state.orders.push({ product: action.payload, quantity: 1 });
                let findOrder5 = state.orders.find(order => order.product.product_id == action.payload.product_id);
                if (findOrder5) {
                    findOrder5.confirm = false;

                }
            }
            //const totalPrice = state.totalPrice + parseInt(action.payload.product_price);
            // state = { totalPrice: totalPrice, orders: state.orders, confirm: false, msg: '' }
            state = { totalPrice: state.totalPrice, orders: state.orders, confirm: false, msg: '' }
            console.log("Order_before", state)
            return state

        case ORDER_DELETE:
            let findOrder2 = state.orders.find(order => order.product.product_id == action.payload);
            if (findOrder2) {
                if (findOrder2.confirm == true)
                    return state
                findOrder2.quantity--;
                //const totalPrice = state.totalPrice - parseInt(findOrder2.product.product_price);
                if (findOrder2.quantity <= 0) {
                    findOrder2.quantity = 1
                    // var array = [...state.orders];
                    // var index = array.indexOf(findOrder2)
                    // if (index !== -1) {
                    //     array.splice(index, 1);
                    // }
                    // console.log("state.orders", array)
                    // //state.orders.remove(findOrder2)
                    // state = { totalPrice: state.totalPrice, orders: array, confirm: false, msg: '' }
                    state = { totalPrice: state.totalPrice, orders: state.orders, confirm: false, msg: '' }
                }
                else
                    state = { totalPrice: state.totalPrice, orders: state.orders, confirm: false, msg: '' }
            }
            console.log("Order", state)
            return state

        case ORDER_POST:
            return { totalPrice: 0, orders: [], saved: true, msg: "บันทึกสินค้าเรียบร้อย" }
        case ORDER_CANCEL:
            console.log("ORDER_CANCEL", state)
            let findOrder3 = state.orders.find(order => order.product.product_id == action.payload.product_id);
            let resultOrder = state.orders.filter(order => order.product.product_id != action.payload.product_id);

            const totalPrice2 = state.totalPrice - (findOrder3.quantity * parseInt(findOrder3.product.product_price));
            state = {
                totalPrice: totalPrice2,
                orders: resultOrder,
                confirm: false
            }
            return state
        case ORDER_CONFIRM:
            let findOrder4 = state.orders.find(order => order.product.product_id == action.payload.product.product_id);


            //let resultOrder = state.orders.filter(order => order.product.product_id != action.payload.product_id);
            //const totalPrice2 = state.totalPrice - (findOrder3.quantity * parseInt(findOrder3.product.product_price));
            /*state = {
                totalPrice: totalPrice2,
                orders: resultOrder,
                confirm: false
            }*/

            // if (findOrder4.quantity > 0)
            //     state.totalPrice = state.totalPrice - action.payload.product_price * findOrder4.quantity

            if (!findOrder4.confirm) {
                state.totalPrice = state.totalPrice + action.payload.product.product_price * findOrder4.quantity
                findOrder4.confirm = true
                
                findOrder4.saleman_id = action.payload.saleman_id
            }
            else {
                console.log("findOrder4.preQuantity", findOrder4.preQuantity)
                state.totalPrice = state.totalPrice - action.payload.product.product_price * findOrder4.preQuantity + action.payload.product.product_price * findOrder4.quantity
                //state.totalPrice = state.totalPrice + action.payload.product_price * findOrder4.quantity

            }
            findOrder4.preQuantity = findOrder4.quantity

            console.log("ORDER_CONFIRM", state)

            return state
        default: return state
    }
}