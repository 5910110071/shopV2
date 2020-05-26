import { COMMENT_POST, COMMENT_FETCH } from "../actions/types"
export default function (state = [], action) {
    switch (action.type) {
        case COMMENT_POST:
            return action.payload
        case COMMENT_FETCH:
            return action.payload
        default:
            return state // ค่าเดิม
    }
}