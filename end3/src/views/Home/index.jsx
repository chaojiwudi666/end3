import React , { useEffect,useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Breadcrumb } from 'antd';

import { ToolOutlined,SolutionOutlined,UserAddOutlined, ThunderboltOutlined,SettingOutlined,ShopOutlined,SafetyOutlined, UserOutlined,AppstoreOutlined,BarsOutlined} from '@ant-design/icons';
import './index.scss';
import userHeadImg from "../../static/images/user-header.png";
import Actions from "../../utils"
//4.1对应映射的字段 
const mapState = ({home}) => ({
  data :home.data
});
//4.2需要使用的http api接口 和 需要使用的方法
const mapDispatch = ( {home} ) => ({

});

// const data = [{
//   path:"/home",
//   icon:<BarsOutlined />,
//   title:"首页",
//   key:"home"
// },{
//   path:"/systemManager",
//   icon:<SettingOutlined />,
//   title:"系统管理",
//   key:"systemManager"
// },{
//   path:"/electricManager",
//   icon:<ThunderboltOutlined />,
//   title:"电费管理",
//   key:"electricManager"
// },{
//   path:"/userInfoManager",
//   icon:<UserAddOutlined />,
//   title:"个人信息管理",
//   key:"userInfoManager"
// },{
//   path:"/dormManager",
//   icon:<ShopOutlined />,
//   title:"寝室信息管理",
//   key:"dormManager"
// },{
//   path:"/hygieneManager",
//   icon:<SafetyOutlined />,
//   title:"卫生管理",
//   key:"hygieneManager"
// },{
//   path:"/visitManager",
//   icon:<SolutionOutlined />,
//   title:"来访人员管理",
//   key:"visitManager"
// },{
//   path:"/repairManager",
//   icon:<ToolOutlined />,
//   title:"报修管理",
//   key:"repairManager"
// },{
//   path:"/studentManager",
//   icon:<ToolOutlined />,
//   title:"学生信息管理",
//   key:"studentManager"
// }]
const Home = (props)=> {
  const [nowTime=Actions.getNowTime(),setNowTime] = useState();
  const [menuData=[],setMenuData] = useState();
  useEffect(() => {
    let role_id = JSON.parse(sessionStorage.getItem("userInfo")).role_id;
    console.log(role_id);
    switch(role_id){
      case 1:setMenuData([{
        path:"/home",
        icon:<BarsOutlined/>,
        title:"首页",
        key:"home"
      },{
        path:"/systemManager",
        icon:<SettingOutlined/>,
        title:"系统管理",
        key:"systemManager"
      },{
        path:"/electricManager",
        icon:<ThunderboltOutlined/>,
        title:"电费管理",
        key:"electricManager"
      },{
        path:"/dormManager",
        icon:<ShopOutlined/>,
        title:"寝室信息管理",
        key:"dormManager"
      },{
        path:"/hygieneManager",
        icon:<SafetyOutlined/>,
        title:"卫生管理",
        key:"hygieneManager"
      },{
        path:"/visitManager",
        icon:<SolutionOutlined/>,
        title:"来访人员管理",
        key:"visitManager"
      },{
        path:"/repairManager",
        icon:<ToolOutlined/>,
        title:"报修管理",
        key:"repairManager"
      },{
        path:"/studentManager",
        icon:<ToolOutlined/>,
        title:"学生信息管理",
        key:"studentManager"
      },{
        path:"/analysis",
        icon:<ToolOutlined/>,
        title:"学生信息管理",
        key:"analysis"
      }])
      break;
      case 2: setMenuData([{
        path:"/home",
        icon:<BarsOutlined/>,
        title:"首页",
        key:"home"
      },{
        path:"/electricManager",
        icon:<ThunderboltOutlined/>,
        title:"电费管理",
        key:"electricManager"
      },{
        path:"/userInfoManager",
        icon:<UserAddOutlined/>,
        title:"个人信息管理",
        key:"userInfoManager"
      },{
        path:"/dormManager",
        icon:<ShopOutlined/>,
        title:"寝室信息管理",
        key:"dormManager"
      },{
        path:"/hygieneManager",
        icon:<SafetyOutlined/>,
        title:"卫生管理",
        key:"hygieneManager"
      },{
        path:"/visitManager",
        icon:<SolutionOutlined/>,
        title:"来访人员管理",
        key:"visitManager"
      },{
        path:"/repairManager",
        icon:<ToolOutlined/>,
        title:"报修管理",
        key:"repairManager"
      },{
        path:"/studentManager",
        icon:<ToolOutlined/>,
        title:"学生信息管理",
        key:"studentManager"
      }])
      break;
      case 4:setMenuData([{
        path:"/home",
        icon:<BarsOutlined/>,
        title:"首页",
        key:"home"
      },{
        path:"/userInfoManager",
        icon:<UserAddOutlined/>,
        title:"个人信息管理",
        key:"userInfoManager"
      },{
        path:"/repairManager",
        icon:<ToolOutlined/>,
        title:"报修管理",
        key:"repairManager"
      }])
      break;
    }
    let Timer;
   
    Timer = setInterval((function() {
      setNowTime(Actions.getNowTime());
    }), 1000)
    return () => clearInterval(Timer);
  
    
  }, []);
const navClick=(item)=>{
  props.history.push(item.path);
}
    return (
      <div className="homePage">
        <div className="userInfo">
          <p>
            <span className="sImg"><UserOutlined /></span>
            
            <span className="sText">用户登录信息</span>
          </p>
          <div className="head-bottom">
            <div className="lineLeft">
              <img src={userHeadImg} alt=""/>
              <div className="userDetail">
                <div className="userName">dsh</div>
                <div className="download">最适配的浏览器：<a href="https://chrome.en.softonic.com/">chrome下载</a></div>
              </div>
            </div>
            <div className="lineRight">
               <div className="time">当前时间：{nowTime}</div> 
            </div>
            
          </div>
        </div>
        <div className="navInfo">
          <p className="navInfo_title">
            <AppstoreOutlined />
            <span className="navInfo_title_detail">宿舍信息管理系统</span>
          </p>
          <ul className="Nav_list_wrap clearfix">
            {
              menuData.map((item)=>{
                return (
                  <li key={item.key} onClick={()=>{
                    navClick(item)
                  }}>
                    <div className="icon_wrap">
                        {item.icon}
                    </div>
                      
                      <div className="nav_title_wrap">
                        {item.title}
                      </div>
                  </li>
                );
              })
            }
          </ul>

        </div>
        {/* <div className="head-top">
          <Breadcrumb>
            <Breadcrumb.Item href="/">
              <UserOutlined />
              <span>首页</span>
            </Breadcrumb.Item >
            <Breadcrumb.Item href="/login">Application</Breadcrumb.Item>
          </Breadcrumb>
        </div> */}
          
      </div>
    );
  }



export default connect(
  mapState, mapDispatch
)(withRouter(Home));