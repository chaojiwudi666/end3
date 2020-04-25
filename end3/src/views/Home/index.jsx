import React , { useEffect,useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import HeadNav from '../../components/HeadNav/index';
import LeftSubMenu from '../../components/LeftSubMenu/index.jsx';
import './index.scss';
//4.1对应映射的字段 
const mapState = ({home}) => ({

});
//4.2需要使用的http api接口 和 需要使用的方法
const mapDispatch = ( {home} ) => ({

});

const Home = (props)=> {


    return (
      <div className="homePage">
          <div className="main-left">
            <LeftSubMenu/>
           
          </div>
          {/* <div className="main-right">
            <div className="head-nav">
              <HeadNav/>
            </div>
           
          </div> */}
      </div>
    );
  }



export default connect(
  mapState, mapDispatch
)(withRouter(Home));