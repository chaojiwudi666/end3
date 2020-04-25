import React, { useEffect } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
// import Login from "./views/Login/index";
// import Home from "./views/Home/index";
import loadableComponent from './utils/loadableComponent';
// import { CloudUtils } from 'cloud-xinyi';
import myRoute from './config/router';
import './App.scss';


function App() {
  return (
    <div className="root">
      <Provider store={store}>
      <HashRouter>
        <Switch>
        {
            myRoute.map(item => (
              <Route
                path={item.path}
                exact={item.exact}
                key={item.path}
                component={loadableComponent(item.component, {
                  model: item.model,
                  loadingType: 'full'
                })}
                
              />
            ))
          }
        {/* <Route
        path="/login"
        exact="true"
        component={Login}
   
      />
      <Route
        path="/home"
        exact="true"
        component={Home}
   
      /> */}
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