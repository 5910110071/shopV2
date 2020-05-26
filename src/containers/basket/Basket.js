import React, { Component } from 'react';

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ShowBasket from '../basket/ShowBasket'
import { connect } from 'react-redux';
import { ordersFetch, orderDelete, ordersPost, orderCancel } from '../../actions'


class Basket extends Component {
    constructor(props) {
        super(props)
        this.cancelOrder = this.cancelOrder.bind(this)
        this.confirmOrder = this.confirmOrder.bind(this)
    }

    componentDidMount() {
        this.props.ordersFetch()
    }

    cancelOrder(product) {
        console.log("cancelOrder", product)
        this.props.orderCancel(product)
    }

    confirmOrder() {
        const { orders } = this.props.orderBuffer
        if (orders && orders.length > 0) {
            this.props.ordersPost(this.props.orderBuffer, this.props.user)
        }
    }

    render() {
        return (
            <div>
                <Header menu={this.props.match.path} />
                <ShowBasket orderBuffer={this.props.orderBuffer}
                            onConfirmOrder={this.confirmOrder}
                            onCancelOrder={this.cancelOrder}
                />
                <Footer />
            </div>
        );
    }
}

function mapStateToProps({ orderBuffer, user }) {
    return { orderBuffer, user }
}
export default connect(mapStateToProps, { ordersFetch, orderDelete, ordersPost, orderCancel })(Basket)