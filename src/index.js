import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter, Router, Route, Switch } from 'react-router-dom';
import './index.css';
import App from './components/App';
import AddCategory from './components/AddCategory';
import EditCategory from './components/EditCategory';

import * as serviceWorker from './serviceWorker';
//import reducer from './reducer';




// Container component
ReactDOM.render(

           <App/>,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
