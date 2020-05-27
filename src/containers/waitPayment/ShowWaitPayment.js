import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  ordersFetch,
  orderDelete,
  ordersPaymentFetch,
  ordersWaitPaymentFetch,
  ordersReset,
  orderPaidDelete,
  basketFetch,
  basketDelete,
  basketDeleteProduct,
  basketEditQuantity
} from "../../actions/";

class ShowWaitPayment extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.basketFetch(this.props.user.id);
  }



  showOrders() {

    const { basket, onSubmit } = this.props;
    const date = new Date(basket.orderDate);
    return (
      <div className="col-md-12 ">
        <div className="mb-4 ">
          <h5 className="text-center mt-3 mb-3 ">รายการสั่งซื้อวันที่ {date.toLocaleDateString()}{" "}{date.toLocaleTimeString()}</h5>
          <div className="row d-flex justify-content-center">
            {basket.orders && basket.orders.map((record) => {
              return (
                <div key={record.product.product_id} className="">
                  <div className="row ">

                    <div className="col-3">
                    <h6 className="text-center title ">{record.product.product_name}</h6>
                      <img src={record.product.product_image} class=" card-img-top img-thumbnail mb-2  rounded mx-auto d-block " Style="width: 100px;" alt="..." />
                      
                    </div>

                    <div className="col-6">
                      <h6 className="text-center title ">จำนวน </h6>

                      <div className="container input-group d-flex justify-content-center   ">
                        <span class="input-group-btn ">
                          <button type="button" class="quantity-left-minus btn btn-outline-dark btn-number" data-type="minus" data-field="" onClick={() => { this.props.basketEditQuantity(record.product.product_id, this.props.user.id, "-") }}>
                            <span class="glyphicon glyphicon-minus">-</span>
                          </button>
                        </span>
                        <input type="text" id="quantity" name="quantity" class="form-control input-number  col-5 text-center" value={record.quantity} min="1" max="10" />
                        <span class="input-group-btn">
                          <button type="button" class="quantity-right-plus btn btn-outline-dark btn-number mr-2" data-type="plus" data-field="" onClick={() => { this.props.basketEditQuantity(record.product.product_id, this.props.user.id, "+", record.quantity, record.product.product_inventory) }}>
                            <span class="glyphicon glyphicon-plus">+</span>
                          </button>
                        </span>

                      </div>
                    </div>
                    <div className="col-3">
                      <h6 className="text-center title ">ราคา : {record.product.product_price * record.quantity}{" "}บาท</h6>
                      <div className="d-flex justify-content-center">
                        <button className="btn btn-danger mb-2 " onClick={() => this.props.basketDeleteProduct(basket._id, record.product.product_id, this.props.user.id)}>ลบ</button>
                      </div>
                    </div>
                  </div>
                  <div className = "container"><hr /></div>
                </div>
              );
            })}
          </div>

          <h5 className="title text-center text-danger mb-3">ยอดรวม {basket.totalPrice} บาท{" "}</h5>
          <div className="d-flex justify-content-center">
            <button className="btn btn-danger title mr-2 mb-3" onClick={() => onSubmit(basket._id)}>ยกเลิกรายการ</button>
            <button className="btn btn-success title mr-2 mb-3" onClick={() => this.props.history.push("/paymentNotification/" + basket.user_id)}>แจ้งชำระเงิน</button>
          </div>
        </div>
      </div>
    );
  }
  render() {
    const { orders, basket } = this.props;
    return (
      <div className="container" style={{ minHeight: "79vh", backgroundColor: "#f5f5f5" }}>
        <h2 className="text-center pt-3 mb-3">ตะกร้าสินค้า</h2>
        {/* {orders.length == 0 ?
                    <div className="container mt-3">
                        
                        <div class="alert alert-primary text-center " role="alert">
                            <h4 className="title col-12 text-right text-center">ไม่มีรายการที่ต้องชำระเงิน <Link to="/">เลือกสินค้า</Link></h4>
                        </div>
                    </div> :
                    <> */}
        <div className="row">
          {basket && this.showOrders()}
        </div>
        {/* </>
                } */}
      </div>
    );
  }
}

function mapStateToprops({ orders, user, basket }) {
  return { orders, user, basket };
}

export default withRouter(
  connect(mapStateToprops, {
    ordersWaitPaymentFetch,
    ordersReset,
    orderPaidDelete,
    basketFetch,
    basketDelete,
    basketDeleteProduct,
    basketEditQuantity
  })(ShowWaitPayment)
);
