import React, { useEffect,useState } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { HomeOutlined, UserOutlined,AppstoreOutlined,BarsOutlined} from '@ant-design/icons';
import {
  TeamOutlined
} from '@ant-design/icons';
import { Provider } from 'react-redux';
import store from './store';
// import Login from "./views/Login/index";
// import Home from "./views/Home/index";
import loadableComponent from './utils/loadableComponent';
import LeftSubMenu from './components/LeftSubMenu/index.jsx';
// import { CloudUtils } from 'cloud-xinyi';
import myRoute from './config/router';
import './App.scss';


const App = () => {
  const [isLogin,setIsLogin] = useState();
  useEffect(() => {
    
    setIsLogin(sessionStorage.getItem("isLogin"));
}, [isLogin]);
const data = [{
  path:"/home",
  icon:<BarsOutlined />,
  title:"首页",
  key:"home"
},{
  path:"/systemManager",
  icon:<BarsOutlined />,
  title:"系统管理",
  key:"systemManager"
},{
  path:"/home",
  icon:<BarsOutlined />,
  title:"电费管理",
  key:"home"
},{
  path:"/home",
  icon:<BarsOutlined />,
  title:"首页",
  key:"home"
},{
  path:"/home",
  icon:<BarsOutlined />,
  title:"首页",
  key:"home"
},{
  path:"/home",
  icon:<BarsOutlined />,
  title:"首页",
  key:"home"
},{
  path:"/home",
  icon:<BarsOutlined />,
  title:"首页",
  key:"home"
},{
  path:"/home",
  icon:<BarsOutlined />,
  title:"首页",
  key:"home"
},{
  path:"/home",
  icon:<BarsOutlined />,
  title:"首页",
  key:"home"
},]
  return (
    <div className="root">
      <Provider store={store}>
        <HashRouter>
          <Switch>
            <Route exact path="/" render={() => <Redirect to='/home'></Redirect>}></Route>
            <Route

              path={"/login"}
              exact={true}

              component={loadableComponent('views/Login', {
                model: 'store/login',
                loadingType: 'full'
              })}

            />
            <React.Fragment>
              <div className="mainLayout">
                <div className="leftLayout">
                  <LeftSubMenu />
                </div>

                <div className="rightLayout">
                  <div className="head-nav">
                    <div className="userName">
                      <TeamOutlined />
                      <span>dsh</span>
                    </div>

                  </div>
                  {
                    myRoute.map(item => {
                      return (
                        sessionStorage.getItem("isLogin") === "isLogin" ?
                          <Route
                            key={item.path}
                            path={item.path}
                            exact={item.exact}

                            component={loadableComponent(item.component, {
                              model: item.model,
                              loadingType: 'full'
                            })}
                          /> : <Route

                            key={item.path}
                            path={item.path}
                            exact={item.exact}

                            render={() => <Redirect to='/login'></Redirect>}

                          />
                      )

                    })
                  }

                </div>

              </div>

            </React.Fragment>

          </Switch>
        </HashRouter>
      </Provider>

    </div>


  )



}
export default App;