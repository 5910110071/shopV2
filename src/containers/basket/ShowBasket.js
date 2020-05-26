import React, { Component } from 'react';
import { Link } from 'react-router-dom'


class Basket extends Component {
    constructor(props) {
        super(props)

    }

    showOrders2(orders) {
        const { onCancelOrder } = this.props
        if (this.props.orderBuffer.totalPrice == 0) {
            return <div className="container">
                <div class="alert alert-primary text-center " role="alert">
                    <h4 className="title col-12 text-right text-center">ไม่มีสินค้าในตระกร้า <Link to="/">เลือกสินค้า</Link></h4>
                </div>
            </div>
        } else {
            return orders.map(order => {
                return (
                    <>
                        {
                            order.confirm && <div key={order.product_id} class="col-3 text-right text-success title mt-3">
                                <div class="card border border-danger" >
                                    <img src={order.product.product_image} class="card-img-top" alt="..." />
                                    <div class=" mt-2 ml-2 mr-2">
                                        <h5 className="text-center title ">{order.product.product_name}</h5>
                                        <h5 className="text-center title ">จำนวน : {order.quantity}</h5>
                                        <h5 className="text-center title ">ราคา : {order.product.product_price * order.quantity} บาท</h5>
                                        <div className="d-flex justify-content-center">
                                            <button className="btn btn-danger mb-2 " onClick={() => onCancelOrder(order.product)} >X</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </>
                )
            })
        }
    }

    render() {
        const { orderBuffer, onConfirmOrder } = this.props
        return (
            <div className="container " style={{ minHeight: '79vh', backgroundColor: '#f5f5f5' }} >
                <h2 className="text-center pt-3 mb-3">สินค้าในตะกร้า</h2>
                {orderBuffer.saved &&
                    
                    <div class="alert alert-success text-center " role="alert">
                        <h4 className="title col-12 text-right text-center">บันทึกรายการสั่งซื้อแล้ว <Link to="/waitPayment">แจ้งชำระเงิน</Link></h4>
                    </div>
                
                }

                <div class="row d-flex justify-content-center">
                    {this.showOrders2(orderBuffer.orders)}
                </div>

                {orderBuffer.totalPrice > 0 &&
                    <>
                        <h4 className="text-center mt-3 text-danger"> ยอดรวม : {orderBuffer.totalPrice} บาท</h4>
                        <div className="d-flex justify-content-center">
                            <button className="btn btn-danger title" onClick={() => onConfirmOrder()} >ยืนยันคำสั่งซื้อ</button>
                        </div>
                    </>
                }
            </div>
        );
    }
}

export default Basket