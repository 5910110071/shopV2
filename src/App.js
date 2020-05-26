import './App.css'
import React, { Component } from 'react';
import {BrowserRouter , Route , Switch} from "react-router-dom"
import Home from "./containers/Home"
import About from "./containers/About"
import Basket from "./containers/basket/Basket"
import Product from "./containers/product/Product"
import NotFound from "./components/NotFound"

import WaitPayment from "./containers/waitPayment/WaitPayment"

import PaymentNotification from "./containers/waitPayment/PaymentNotification"

import UpdateTrackingNumber from "./containers/paid/UpdateTrackingNumber"

import Paid from "./containers/paid/Paid"

class App extends Component {

  renderRouter(){
    return (
      <Switch>
        <Route exact path = "/" component = {Home} />
        <Route exact path = "/about" component = {About} />
        <Route exact path = "/basket" component = {Basket} />
        <Route exact path = "/waitPayment" component = {WaitPayment} />
        <Route exact path = "/paymentNotification/:id" component = {PaymentNotification} />
        <Route exact path = "/UpdateTrackingNumber/:id" component = {UpdateTrackingNumber} />
        <Route exact path = "/paid" component = {Paid} />
        <Route exact path="/product/:id/:id2" component={Product}/>
        <Route component={NotFound}/>
      </Switch>
    )
  }

  render() {
    return (
      <div >
        <BrowserRouter>{this.renderRouter()}</BrowserRouter>
      </div>
    );
  }
}

export default App;
