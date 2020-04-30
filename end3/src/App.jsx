import React, { useEffect,useState } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { TeamOutlined,DownOutlined,ToolOutlined,SolutionOutlined,UserAddOutlined, ThunderboltOutlined,SettingOutlined,BarsOutlined,ShopOutlined,SafetyOutlined} from '@ant-design/icons';
import { Menu, Dropdown } from 'antd';
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
  const changeLoginStatus = (val)=>{
    console.log(val);
    setIsLogin(val);
  }
  
const data = [{
  path:"/home",
  icon:<BarsOutlined />,
  title:"首页",
  key:"home"
},{
  path:"/systemManager",
  icon:<SettingOutlined />,
  title:"系统管理",
  key:"systemManager"
},{
  path:"/electricManager",
  icon:<ThunderboltOutlined />,
  title:"电费管理",
  key:"electricManager"
},{
  path:"/userInfoManager",
  icon:<UserAddOutlined />,
  title:"个人信息管理",
  key:"userInfoManager"
},{
  path:"/dormManager",
  icon:<ShopOutlined />,
  title:"寝室信息管理",
  key:"dormManager"
},{
  path:"/hygieneManager",
  icon:<SafetyOutlined />,
  title:"卫生管理",
  key:"hygieneManager"
},{
  path:"/visitManager",
  icon:<SolutionOutlined />,
  title:"来访人员管理",
  key:"visitManager"
},{
  path:"/repairManager",
  icon:<ToolOutlined />,
  title:"报修管理",
  key:"repairManager"
}]
const menu = (
 
    <div className="layoutBtn_wrap">
        <a href="/login">
          退出登录
        </a>
    </div>
  )
console.log(loadableComponent('views/Login', {
  model: 'store/login',
  loadingType: 'full'
}));
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
              },changeLoginStatus)}
             

            />
            <React.Fragment>
              <div className="mainLayout">
                <div className="leftLayout">
                  <LeftSubMenu data={data}/>
                </div>

                <div className="rightLayout">
                  <div className="head-nav">
                    <div className="userName">
                      <TeamOutlined />
                      <Dropdown overlay={menu} className="dropdown">
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                          dsh <DownOutlined />
                        </a>
                      </Dropdown>
                    </div>

                  </div>
                  {
                    myRoute.map(item => {
                      return (
                        isLogin === "isLogin" ?
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