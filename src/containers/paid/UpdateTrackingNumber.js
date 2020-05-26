import React, { Component } from "react"
import { connect } from "react-redux"

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import UpdateTrackingNumberForm from "../../containers/paid/UpdateTrackingNumberForm"

import { orderPaymentFetch, ordersPaymentPut } from '../../actions/'

class UpdateTrackingNumber extends Component {
    componentDidMount() {
        if (this.props.match.params.id) {
            this.props.orderPaymentFetch(this.props.match.params.id)
            console.log("this.props.id", this.props.match.params.id)
        }
    }

    onSubmit(formValues) {
        console.log("formValues", formValues)
        this.props.ordersPaymentPut(formValues._id, formValues)
    }
    render() {
        const { formValues, orders } = this.props;
        return (
            <div>
                <Header menu={this.props.match.path} />
                <div className="container" style={{ minHeight: '79vh', backgroundColor: '#f5f5f5' }}>
                    <h2 className="text-center pt-3" >เพิ่มหมายเลขติดตามสินค้า</h2>
                    <UpdateTrackingNumberForm onPaymentSubmit={() => this.onSubmit(formValues)} orders={orders} />
                </div>
                <Footer />
            </div>
        )
    }
}
function mapStateToProps({ form, orders }) {
    return { formValues: form.TrackingNumberForm ? form.TrackingNumberForm.values : null, orders }
}
export default connect(mapStateToProps, { orderPaymentFetch, ordersPaymentPut })(UpdateTrackingNumber)