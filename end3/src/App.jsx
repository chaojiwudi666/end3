import React, { useEffect } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Login from "./views/Login/index";
import Home from "./views/Home/index";
import myRoute from './config/router';
import './App.scss'
function App() {
  return (
    <div className="root">
      <Provider store={store}>
      <HashRouter>
        <Switch>
        <Route
        path="/login"
        exact="true"
        component={Login}
   
      />
      <Route
        path="/home"
        exact="true"
        component={Home}
   
      />
        {/* {
            myRoute.map((item,index) => (
              <Route
                path={item.path}
                exact={item.exact}
                component={item.component}
                key={index}
              />
            ))
          } */}
          <Redirect from="/" to="/home" exact />
        </Switch>
      </HashRouter>
    </Provider>

    </div>


  )



}
export default App;