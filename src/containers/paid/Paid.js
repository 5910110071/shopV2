import React, { Component } from 'react';
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom"
import ShowPaid from "../paid/ShowPaid"
import axios from "axios"

import { ordersFetch, orderDelete, ordersPaidFetch, ordersReset, ordersPaymentStatusPut } from '../../actions'

class PaymentMornitor extends Component {
    constructor(props) {
        super(props)
        this.changeStatus = this.changeStatus.bind(this)
    }
    componentDidMount() {
        this.props.ordersPaidFetch(this.props.user.id)
    }
    changeStatus(order, status) {
        console.log("order", order)
        order.status = status

        
        axios.post("http://localhost:5000/mail", { name: "test9", email: "chanon.5613@gmail.com", message: status }).then(
            res => {
                //dispatch({ type: COMMENT_POST, payload: res.data })
                // this.props.ordersPaymentStatusPut(order._id, order, this.props.user.id)
            }
        )

        this.props.ordersPaymentStatusPut(order._id, order, this.props.user.id)

    }
    render() {
        // const { orders , onChangeStatus   } = this.props
        return (
            <div>
                <Header menu={this.props.match.path} />
                <ShowPaid
                    orders={this.props.orders}
                    onChangeStatus={this.changeStatus}
                    user = {this.props.user} />
                <Footer />
            </div>

        )
    }
}
function mapStateToprops({ orders, user }) {
    console.log("payments", orders)
    return { orders, user }
}
export default withRouter(connect(mapStateToprops, { ordersPaidFetch, ordersReset, ordersPaymentStatusPut })(PaymentMornitor))