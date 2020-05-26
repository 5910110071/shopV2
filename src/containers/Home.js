import React, { Component } from 'react';
import Header from "../components/Header";
import Monitor from "../components/Monitor";
import Footer from "../components/Footer";
import axios from "axios"


import { Link } from 'react-router-dom'
import { connect } from "react-redux"
import { productsFetch } from "../actions/"


class Home extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.productsFetch()
  }
  
  render() { 
    return (
      <div>
        <Header showCategoryAndSearch = {true} menu = {this.props.match.path} />
        <Monitor products={this.props.products} />
        <Footer company="Olanlab" email="olan@olanlab.com" />
      </div>
    );
  }
}

function mapStateToProps({ products }) {
  return { products }
}

export default connect(mapStateToProps, { productsFetch })(Home);
