import React, { Component } from "react"

import { connect } from "react-redux"
import { reduxForm, Field } from "redux-form"

import FormField from "../../components/FormField"
import UploadFile from "../../components/UploadFile"

import { WaitPaymentFormFields } from "./WaitPaymentFormFields"

import { Link } from 'react-router-dom'


class WaitPaymentForm extends Component {

    renderFields(WaitPaymentFormFields) {

        return WaitPaymentFormFields.map(({ label, name, type, required }) => {
            return (
                <Field key={name} label={label} name={name} type={type} required={required} component={FormField} />
            )
        })

    }
    showOrders() {
        const { orders } = this.props
        console.log("orders",orders)
        const date = new Date(orders.orderDate)
        return (

            <div className="col-md-12">
                <div className=" mb-4">
                    <h5 className="text-center mt-3 mb-3">รายการสั่งซื้อวันที่ {date.toLocaleDateString()} {date.toLocaleTimeString()}</h5>
                    <div className="row d-flex justify-content-center">
                        {orders.orders && orders.orders.map(record => {
                            return (
                                <div key={record.product.product_id} className="col-2 d-flex flex-column bd-highlight mb-2">
                                    <img src={record.product.product_image} class="card-img-top img-thumbnail mb-2  rounded mx-auto d-block" Style="width: 100px;" alt="..." />
                                    <h6 className="text-center title ">{record.product.product_name}</h6>
                                    <h6 className="text-center title ">จำนวน : {record.quantity}</h6>
                                    <h6 className="text-center title ">ราคา : {record.product.product_price * record.quantity} บาท</h6>
                                </div>
                            )
                        })}
                    </div>
                    <h5 className="title text-center text-danger mb-3">ยอดรวม {orders.totalPrice} บาท </h5>
                </div>
            </div>
        )
    }
    render() {

        const { onPaymentSubmit, orders } = this.props
        return (
            <div>
                {/* {
                    orders.saved ?
                        <div className="container mt-3">
                            <div class="alert alert-success text-center col-12" role="alert">
                                <h4 className="title col-12 text-right text-center">แจ้งชำระเงินแล้ว <Link to="/paid">ติดตามรายการสั่งซื้อ</Link></h4>
                            </div>
                        </div> : */}
                        <div className="container card  mb-3">
                            <div className="row d-flex justify-content-center" >
                                {this.showOrders()}
                                <div className="col-6 ">
                                    <form onSubmit={this.props.handleSubmit(onPaymentSubmit)}>
                                        {this.renderFields(WaitPaymentFormFields)}
                                        <Field component={UploadFile} label="อัพโหลดหลักฐานการชำระเงิน" name='image' accept='.png , .jpg' />
                                        <div className="d-flex justify-content-end">
                                            <button className="btn  btn-danger title mb-3 " type="submit" required="true" >บันทึก</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                {/* } */}
            </div>


        )
    }
}

function validate(values) {
    console.log("values", values)
    const errors = {};
    WaitPaymentFormFields.forEach(({ name, required }) => {
        if (!values[name] && required) {
            errors[name] = 'กรุณากรอกข้อมูล'
        }
    })
    return errors // redux from จะจัดการโดยการส่ง error ไปให้ Field
}
function mapStateToProps({ basket , user }) {
    if (basket && basket._id) {
        return { initialValues: basket }
    }
    else {
        return {}
    }
}

WaitPaymentForm = reduxForm({ validate, form: "paymentForm" })(WaitPaymentForm)
export default connect(mapStateToProps)(WaitPaymentForm)