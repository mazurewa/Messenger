import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import './index.css';
import Root from './Root';
import reducer from './reducers';
import thunk from 'redux-thunk';
import * as serviceWorker from './serviceWorker';
import "bootstrap/dist/css/bootstrap.css";

const middleware = [thunk];

const store = createStore(reducer,applyMiddleware(...middleware)); // przyjmuje kolekcje reducerow i kolekcje middlewarow, ...middleware = zwracane sa wszystkie elementy

ReactDOM.render(<Root store={store} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
