import React, { Component } from "react"
import { connect } from "react-redux"
import { reduxForm, Field } from "redux-form"
import FormField from "../../components/FormField"
import { UpdateTrackNumberFormFields } from "./UpdateTrackNumberFormFields"
import { Link } from 'react-router-dom'
class UpdateTrackingNumberForm extends Component {

    renderFields(UpdateTrackNumberFormFields) {

        return UpdateTrackNumberFormFields.map(({ label, name, type, required }) => {
            return (
                <Field key={name} label={label} name={name} type={type} required={required} component={FormField} />
            )
        })
    }

    showOrders() {
        const date = new Date(this.props.orders.orderDate)
        return (
            <div className="col-md-12">
                <div className=" mb-4">
                    <h5 className="text-center mt-3 mb-3">รายการสั่งซื้อวันที่ {date.toLocaleDateString()} {date.toLocaleTimeString()}</h5>
                    <div className="row d-flex justify-content-center">
                        {this.props.orders.orders && this.props.orders.orders.map(record => {
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


                    <h5 className="title text-center text-danger mb-3">ยอดรวม {this.props.orders.totalPrice} บาท </h5>
                </div>
            </div>
        )
    }

    render() {
        const { onPaymentSubmit } = this.props
        return (
            <div>
                {this.props.orders.saved ?
                    <div className="container mt-3">
                        <div class="alert alert-success text-center col-12" role="alert">
                            <h4 className="title col-12 text-right text-center">เพิ่มหมายเลขติดตามสินค้าแล้ว <Link to="/paid">ติดตามรายการสั่งซื้อ</Link></h4>
                        </div>
                    </div> :
                    <div className="container card  mb-3 ">
                        <div className="row d-flex justify-content-center" > {this.showOrders()}
                            <div className="col-6 ">
                                <form onSubmit={this.props.handleSubmit(onPaymentSubmit)}>
                                    {this.renderFields(UpdateTrackNumberFormFields)}
                                    <div className="d-flex justify-content-end">
                                        <button className="btn  btn-danger title mb-3 " type="submit" >บันทึก</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                }
            </div>



        )
    }
}

function validate(values) {
    console.log("values", values)
    const errors = {};
    UpdateTrackNumberFormFields.forEach(({ name, required }) => {
        if (!values[name] && required) {
            errors[name] = 'กรุณากรอกข้อมูล'
        }
    })
    return errors // redux from จะจัดการโดยการส่ง error ไปให้ Field
}
function mapStateToProps({ orders }) {
    if (orders && orders._id) {
        return { initialValues: orders }
    }
    else {
        return {}
    }

}

UpdateTrackingNumberForm = reduxForm({ validate, form: "TrackingNumberForm" })(UpdateTrackingNumberForm)
export default connect(mapStateToProps)(UpdateTrackingNumberForm)