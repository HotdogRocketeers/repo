import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import TokenCreator from './components/TokenCreator.js';
import { BrowserRouter, Route, IndexRoute,Switch } from 'react-router-dom';
import { Link } from "react-router-dom";
import AboutUs from './components/AboutUs.js';

ReactDOM.render(

    
    <div>
        <BrowserRouter>
      <Switch>
      <Route exact path="/" component={App} />
           <Route path="/TokenCreator" component={TokenCreator} />

           <Route path="/AboutUs" component={AboutUs} />

           </Switch>
           </BrowserRouter>
           </div>
      
       ,



document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
