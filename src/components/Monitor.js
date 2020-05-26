import React, { Component } from "react";
import { withRouter } from "react-router-dom"

class Monitor extends Component {

    constructor(props) {
        super(props);
    }
    componentDidMount() {
        //console.log("this.props.match", this.props.match.path)

    }

    selectProduct(product) {

        this.props.history.push('product/' + product.product_id+ '/'+"aaaaa")
    }

    showProducts() {
        //console.log("this.props.products", this.props.products);
        return (
            (this.props.products && Array.isArray(this.props.products)) &&
            this.props.products.map(product => (

                <div class="col-md-3 btn" onClick={() => this.selectProduct(product)} >
                    <div className="card bg-white text-black border border-danger" style={{ backgroundColor: '#f5f5f5' }}>
                        <img src={product.product_image} class="card-img-top" alt="..." />
                        <div class="d-flex justify-content-between mt-2 ml-2 mr-2">
                            <h5 className="text-left">{product.product_name}</h5>
                            <h5 className="title text-right text-danger" >{product.product_price} บาท</h5>
                        </div>
                    </div>
                </div>
            ))
        );
    }

    render() {
        return (
            <div className="container pt-3 " style={{ minHeight: '79vh', backgroundColor: '#f5f5f5' }}>
                <h2 className="text-center">รายการสินค้า</h2>
                <div className="row ">
                    <div className="col-md-12 ">
                        <div className="row justify-content-center">
                            {this.showProducts()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Monitor); 