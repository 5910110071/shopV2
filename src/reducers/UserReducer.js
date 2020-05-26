import {  SET_USER ,GET_USER ,RESET_USER } from "../actions/types"
export default function (state = null , action) {
    switch (action.type) {
    
        case SET_USER:
            // state.id = action.payload.id
            // state.user_name = action.payload.user_name
            // state.user_address = action.payload.user_address
            // state.user_email = action.payload.user_email
            // state.user_tel = action.payload.user_tel
            return action.payload
        case GET_USER:
            return action.payload
        case RESET_USER: 
            
            return null
        default: return state
    }
}