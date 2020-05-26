import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import ReactDOM from 'react-dom';
//import App from './App';
import Main from './Main';
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import reduxThunk from "redux-thunk"
import reducers from "./reducers"
import * as serviceWorker from './serviceWorker';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk))

ReactDOM.render(
  <div style={{backgroundColor:'#f5f5f5'}}>
    <Provider store={store}>
      <Main />
    </Provider>
  </div>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
