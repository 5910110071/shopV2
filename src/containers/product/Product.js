import React, { Component } from 'react';
import { productFetch } from "../../actions"
import { connect } from "react-redux"

import ShowDetail2 from "./ShowDetail2"
import UserComment from "./UserComment"
import Comment from "./Comment"
import Header from "../../components/Header"
import Footer from "../../components/Footer"

class Product extends Component {
    
    componentDidMount() {
        if (this.props.match.params.id) {
            this.props.productFetch(this.props.match.params.id)
        }
    }

    render() {

        console.log(this.props.basket)
       
        return (
            <div>
                <Header menu={this.props.match.path} />
                <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
                    <ShowDetail2 products={this.props.products} product_id = {this.props.match.params.id} saleman_id = {this.props.match.params.id2} />
                    <UserComment product_id = {this.props.match.params.id} comments = {this.props.comments} />
                    <Comment product_id = {this.props.match.params.id} />
                </div>>
                <Footer />
            </div>
        )
    }
}

function mapStateToProps({ products , basket}) {
    return { products ,basket  }
}
export default connect(mapStateToProps, { productFetch })(Product)