import React, { Component } from 'react';
import { withRouter } from "react-router-dom"

class PaymentMornitor extends Component {
    constructor(props) {
        super(props)
    }

    showOrders() {
        const { orders, onChangeStatus } = this.props
        return orders && Array.isArray(orders) && orders.map(order => {
            const date = new Date(order.orderDate)
            return (
                <div key={order.id} className="col-12">
                    <div className="card mb-4">
                        <h5 className="text-center mt-3 mb-3">รายการสั่งซื้อวันที่ {date.toLocaleDateString()} {date.toLocaleTimeString()}</h5>
                        <div className="row d-flex justify-content-center">
                            {order.orders && order.orders.map(record => {
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
                        <h5 className="title text-center text-danger mb-3">ยอดรวม {order.totalPrice} บาท </h5>

                        <hr />
                        <h5 className="text-right mt-2 text-center">ข้อมูลการชำระเงิน</h5>

                        <div className="row">

                            <div className="col-6">
                                <div className="ml-2 text-right">
                                    <p>ชื่อ : {order.user_name}</p>
                                    <p>ที่อยู่ : {order.user_address} </p>
                                    <p>เบอร์โทร์ : {order.user_tel}</p>
                                    {/* <p>หลักฐานการโอน : <img src={order.Silp} Style="width: 200px;" /></p> */}
                                    <p>สถานะ : {order.status}
                                    </p>
                                    {this.props.user.id == "PoK3aDRlXeYhtHWBg1sMYSZIOHo1" &&
                                        <button type="button" class={order.status == "สินค้ากำลังจัดส่ง" ? "btn btn-success ml-2 " : "btn btn-secondary ml-2"} onClick={() => this.props.history.push('/UpdateTrackingNumber/' + order._id)}>
                                            เพิ่มหมายเลขติดตามสินค้า
                                </button>}


                                    <p>หมายเลขติดตามสินค้า : {order.TrackingNumber} </p>
                                </div>
                            </div>

                            <div className="col-6  mb-3 mt-2">
                                {/* <p>หลักฐานการโอน : </p> */}
                                <img src={order.Silp} Style="width: 500px;" />
                            </div>


                        </div>
                        {this.props.user.id == "PoK3aDRlXeYhtHWBg1sMYSZIOHo1" &&
                            <div class="btn-group dropup mb-2 ">
                                <button type="button" class={order.status == "ข้อมูลการชำระเงินถูกต้อง" ? "btn btn-success ml-2 " : "btn btn-secondary ml-2"} onClick={() => onChangeStatus(order, "ข้อมูลการชำระเงินถูกต้อง")}>ข้อมูลการชำระเงินถูกต้อง</button>
                                <button type="button" class={order.status == "สินค้ากำลังจัดส่ง" ? "btn btn-success ml-2 " : "btn btn-secondary ml-2"} onClick={() => onChangeStatus(order, "สินค้ากำลังจัดส่ง")}>สินค้ากำลังจัดส่ง</button>
                                <button type="button" class={order.status == "สินค้าจัดส่งสำเร็จ" ? "btn btn-success ml-2 mr-2 " : "btn btn-secondary ml-2 mr-2"} onClick={() => onChangeStatus(order, "สินค้าจัดส่งสำเร็จ")}>สินค้าจัดส่งสำเร็จ</button>
                            </div>
                        }

                    </div>
                </div>
            )
        })
    }
    render() {
        return (

            <div className="container" style={{ minHeight: '79vh', backgroundColor: '#f5f5f5' }}>
                <h2 className="text-center pt-3 mb-3">ตรวจสอบรายการสั่งซื้อ</h2>
                <div className="row">
                    {this.showOrders()}
                </div>
            </div>
        )
    }
}

export default withRouter(PaymentMornitor)