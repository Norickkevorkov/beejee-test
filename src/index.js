import React from 'react';
import { createStore } from 'redux';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import rootReducer from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ServiceContainer from './services';
const store = createStore(rootReducer, undefined, composeWithDevTools());
console.log(store);
const services = new ServiceContainer(store);
ReactDOM.render(<Provider store={store}><App services={services}/></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
