import { BASKET_POST } from "../actions/types"
export default function (state = {}, action) {
    switch (action.type) {
        case BASKET_POST:
            return action.payload
        default:
            return state // ค่าเดิม
    }
}