import React, { Component } from 'react';

import ShowWaitPayment from '../../containers/waitPayment/ShowWaitPayment'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom"

import { ordersFetch, orderDelete, ordersPaymentFetch, ordersWaitPaymentFetch, ordersReset, orderPaidDelete , basketFetch , basketDelete  } from '../../actions/'
import axios from "axios"
class PaymentOrder extends Component {
    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
    }
    componentDidMount() {
        //this.props.ordersWaitPaymentFetch(this.props.user.id)
        console.log("here")
        //this.props.basketFetch(this.props.user.id)
    }
    onSubmit(user_id) {
        this.props.basketDelete(user_id) 
    }
    //const {orders , onSubmit }
    render() {
        console.log("this.props.basket",this.props.basket)
        return (
            <div>
                <Header menu={this.props.match.path} />
                <ShowWaitPayment
                    user = {this.props.user}
                    //orders={this.props.basket}
                    onSubmit={this.onSubmit}
                    //basketDeleteProduct = {this.props.basketDeleteProduct}
                />
                <Footer />
            </div>

        )
    }
}
function mapStateToprops({ orders, user , basket }) {
    return { orders, user , basket }
}
export default withRouter(connect(mapStateToprops, { ordersWaitPaymentFetch, ordersReset, orderPaidDelete , basketFetch , basketDelete  })(PaymentOrder))