import React, { Component } from "react"
import { connect } from "react-redux"
import { reduxForm, Field } from "redux-form"
import FormField from "../../components/FormField"
import { RegisterFormFields } from "./RegisterFormFields"
class RegisterForm extends Component {

    renderFields(RegisterFormFields) {

        return RegisterFormFields.map(({ label, name, type, required }) => {
            return (
                <Field key={name} label={label} name={name} type={type} required={required} component={FormField} />
            )
        })

    }
    // showOrders() {
    //     const date = new Date(this.props.orders.orderDate)
    //     return (
    //         <div className="col-md-12">
    //             <div className=" mb-4">
    //                 <h5 className="text-center mt-3 mb-3">รายการสั่งซื้อวันที่ {date.toLocaleDateString()} {date.toLocaleTimeString()}</h5>
    //                 <div className="row d-flex justify-content-center">
    //                     {this.props.orders.orders && this.props.orders.orders.map(record => {
    //                         return (
    //                             <div key={record.product.product_id} className="col-2 d-flex flex-column bd-highlight mb-2">
    //                                 <img src={record.product.product_thumbnail} class="card-img-top img-thumbnail mb-2  rounded mx-auto d-block" Style="width: 100px;" alt="..." />
    //                                 <h6 className="text-center title ">{record.product.product_name}</h6>
    //                                 <h6 className="text-center title ">จำนวน : {record.quantity}</h6>
    //                                 <h6 className="text-center title ">ราคา : {record.product.product_price * record.quantity} บาท</h6>
    //                             </div>
    //                         )
    //                     })}
    //                 </div>


    //                 <h5 className="title text-center text-danger mb-3">ยอดรวม {this.props.orders.totalPrice} บาท </h5>
    //             </div>
    //         </div>
    //     )
    // }

    render() {
        const { onPaymentSubmit } = this.props
        return (
            <div className="container mb-3 card">
                <div className="row d-flex justify-content-center " >
                    {/* {this.props.orders.saved ?
                        <div class="alert alert-success text-center col-12" role="alert">
                            <h5>{this.props.orders.msg}</h5> <button className="btn btn-success title">กดเพื่อติดตามสินค้า</button>
                        </div> :
                        <> {this.showOrders()}

                            <div className="col-6 ">
                                <form onSubmit={this.props.handleSubmit(onPaymentSubmit)}>
                                    {this.renderFields(RegisterFormFields)}
                                    <div className="d-flex justify-content-end">
                                        <button className="btn  btn-danger title mb-3 " type="submit" >บันทึก</button>
                                    </div>
                                </form>
                            </div>
                        </>
                    } */}

                    <form onSubmit={this.props.handleSubmit(onPaymentSubmit)}>
                        <h2 className = "mt-3">ลงทะเบียนเข้าใช้งาน</h2>
                        {this.renderFields(RegisterFormFields)}
                        <div className="">
                            <button className="btn btn-block  btn-danger title mb-4 mt-4 " type="submit" >บันทึก</button>
                        </div>
                    </form>

                </div>
            </div>
        )
    }
}

function validate(values) {
    //console.log("values", values)
    const errors = {};
    RegisterFormFields.forEach(({ name, required }) => {
        if (!values[name] && required) {
            errors[name] = 'กรุณากรอกข้อมูล'
        }
    })
    return errors // redux from จะจัดการโดยการส่ง error ไปให้ Field
}

function mapStateToProps({ orders }) {
    // if (orders && orders.id) {
    //     return { initialValues: orders }
    // }
    // else {
    //     return {}
    // }
    return { orders }
}

RegisterForm = reduxForm({ validate, form: "registerForm" })(RegisterForm)
export default connect(mapStateToProps)(RegisterForm)