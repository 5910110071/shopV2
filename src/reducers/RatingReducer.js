import { RATING_FETCH } from "../actions/types"
export default function (state = {}, action) {
    switch (action.type) {
        case RATING_FETCH:
            return action.payload
        default:
            return state // ค่าเดิม
    }
}