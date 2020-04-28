import React , { useEffect,useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Breadcrumb } from 'antd';
import { HomeOutlined, UserOutlined,AppstoreOutlined,BarsOutlined} from '@ant-design/icons';
import './index.scss';
import userHeadImg from "../../static/images/user-header.png";
import Actions from "../../utils"
//4.1对应映射的字段 
const mapState = ({home}) => ({

});
//4.2需要使用的http api接口 和 需要使用的方法
const mapDispatch = ( {home} ) => ({

});

const Home = (props)=> {
  const [nowTime,setNowTime] = useState();
  useEffect(() => {
    let Timer;
    clearInterval(Timer);
    Timer = setInterval((function() {
      setNowTime(Actions.getNowTime());
    }), 1000)
    
  }, []);

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
          <ul className="Nav_list_wrap">
            <li></li>
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