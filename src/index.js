import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";

import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';

import * as Reducers from './Redux/Reducers/index';
import App from './App';
import * as serviceWorker from './serviceWorker';


import './index.css';

const rootReducer = combineReducers(Reducers);

const store = createStore(rootReducer)

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider> , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();