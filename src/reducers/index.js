import {combineReducers} from "redux"
import {reducer as reduxForm} from "redux-form"
import ProductReducer from "./ProductReducer"
import OrderReducer from "./OrderReducer"
import CategoryReducer from "./CategoryReducer"
import OrderBufferReducer from "./OrderBufferReducer"
import UserReducer from "./UserReducer"
import CommentReducer from "./CommentReducer"
import Rating from "./RatingReducer"
import BasketReducer from "./BasketReducer"

const rootRuducer  = combineReducers({
    orders : OrderReducer,
    products : ProductReducer,
    categories : CategoryReducer,
    orderBuffer : OrderBufferReducer,
    user : UserReducer,
    comments : CommentReducer,
    rating : Rating,
    basket: BasketReducer,
    form : reduxForm
})
export default rootRuducer