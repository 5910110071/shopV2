import React, { Component } from 'react';
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { Link } from 'react-router-dom'
import StarRatingComponent from 'react-star-rating-component';

import { ratingFetch2, orderConfirm2, basketFetch } from "../../actions"

class ShowDetail2 extends Component {

    constructor(props) {
        super(props)
        this.state = {
            rating: 1,
            confirm: false,
            quantity: 1,
            overflow: false,
            totalQuantity : 1
        }
    }

    onStarClick(nextValue, prevValue, name) {
        this.setState({ rating: nextValue });
    }

    componentDidMount() {
        
        this.props.ratingFetch2(this.props.product_id)
        console.log("componentDidMount", this.props.rating)
    
        this.props.basketFetch(this.props.user.id)
    }

    addOrder(product) {
        if (this.state.quantity < product.product_inventory)
            this.setState({
                quantity: this.state.quantity + 1
            })
    }

    
    delOrder() {
        if (this.state.quantity > 1)
            this.setState({
                quantity: this.state.quantity - 1
            })
    }


    confirmOrder(product, saleman_id) {
        
        if (this.props.basket) {
            
            let findOrder = this.props.basket.orders.find(order => order.product.product_id == product.product_id);
            if (findOrder) {
                
                //console.log("findOrder.quantity",findOrder.quantity)
                if (findOrder.quantity + this.state.quantity > findOrder.product.product_inventory) {

                    this.setState({
                        overflow: true,
                        quantity : 1
                    })
                }
                else {

                    this.props.orderConfirm2(product, saleman_id, this.props.user, this.state.quantity)
                    this.setState({
                        confirm: true,
                        quantity : 1

                    })
                }
            }
            else {
                this.props.orderConfirm2(product, saleman_id, this.props.user, this.state.quantity)
                this.setState({
                    confirm: true,
                    quantity : 1
                   
                })
            }
        }
        else {
            this.props.orderConfirm2(product, saleman_id, this.props.user, this.state.quantity)
            this.setState({
                confirm: true,
                quantity : 1
            })
        }
    }

    // checkQuantity(){
    //     //console.log("checkQuantity")
    //     if(this.props.basket){
    //         let findOrder = this.props.basket.orders.find(order => order.product.product_id === this.props.product_id);
    //         console.log("checkQuantity",findOrder.quantity)
    //         return findOrder.quantity
    //     }
    // }

    render() {
        const { products } = this.props

        return (
            <div className="container" >
                <h2 className="text-center pt-3 mb-3">รายละเอียดสินค้า</h2>
                <div className="card mb-3 ">
                    <div className="row no-gutters">

                        {this.state.confirm &&
                            <div className="container mt-3">
                                <div className="alert alert-success text-center " role="alert">
                                    <h4 className="title col-12 text-right text-center">ได้ทำการเพิ่มสินค้าลงตะกร้าแล้วกรุณาตรวจสอบที่ <Link to="/waitPayment">ตะกร้าสินค้า </Link></h4>
                                </div>
                            </div>
                        }

                        {this.state.overflow &&
                            <div className="container mt-3">
                                <div className="alert alert-danger text-center " role="alert">
                                    <h4 className="title col-12 text-right text-center">จำนวนสินค้าไม่เพียงพอ <Link to="/waitPayment">ตะกร้าสินค้า </Link></h4>
                                </div>
                            </div>
                        }

                        <div className="col-md-5">
                            <img src={products.product_image} className="card-img" alt="..." />
                        </div>
                        <div className="col-md-7">

                            <div className="card-body">
                                <h3 className="card-title">{products.product_name}</h3>
                                <p className="card-text">รายละเอียดสินค้า : {products.product_detail}</p>
                                <p className="card-text">จำนวนที่เหลือ : {products.product_inventory}</p>
                                <p className="card-text">ราคา : {products.product_price} บาท</p>
                            </div>

                            <div className="container input-group d-flex justify-content-end   ">
                                <h5 className="text-right mr-2">จำนวน :  </h5>
                                <span class="input-group-btn ">
                                    <button type="button" class="quantity-left-minus btn btn-secondary btn-number" data-type="minus" data-field="" onClick={() => this.delOrder(products.product_id)}>
                                        <span class="glyphicon glyphicon-minus">-</span>
                                    </button>
                                </span>
                                <input type="text" id="quantity" name="quantity" class="form-control input-number col-1 text-center" value={this.state.quantity} min="1" max="10" />
                                <span className="input-group-btn">
                                    <button type="button" class="quantity-right-plus btn btn-secondary btn-number mr-2" data-type="plus" data-field="" onClick={() => this.addOrder(products)}>
                                        <span className="glyphicon glyphicon-plus">+</span>
                                    </button>
                                </span>
                            </div>
                            <div className=" mr-4 mt-3 d-flex justify-content-end">
                                <button className="btn btn-danger" onClick={() => this.confirmOrder(products, this.props.saleman_id)}>เพิ่มลงตะกร้า </button>
                            </div>
                            <div className=" btn d-flex justify-content-end bd-highlight mb-3 mr-5" onClick={() => this.props.history.push('/basket/')}>
                                <img src="https://cdn1.iconfinder.com/data/icons/ecommerce-1-9/48/2-512.png" class="mt-2" Style="width: 50px;" alt="..." />
                            </div>


                            <div className="d-flex justify-content-center">
                                {(this.props.rating != null) &&
                                    < StarRatingComponent
                                        name="rate1"
                                        starCount={5}
                                        value={this.props.rating.average}
                                        renderStarIcon={() => <h1>★</h1>}
                                        onStarClick={this.onStarClick.bind(this)}
                                    />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ rating, user, basket }) {
    return { rating, user, basket }
}

export default withRouter(connect(mapStateToProps, { ratingFetch2, orderConfirm2, basketFetch })(ShowDetail2))