import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter} from "react-router-dom"
import { Provider } from 'react-redux';
import {configureStore} from './store';


const store = configureStore();


ReactDOM.render(
  <Provider store={store}>
    <HashRouter basename="/">
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);


