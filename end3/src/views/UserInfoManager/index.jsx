import React, { useEffect, useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table, Radio, Divider, Button, Modal, Form, Input } from 'antd';

import { HomeOutlined, UserOutlined, PlusOutlined, FormOutlined, CloseSquareOutlined, UnorderedListOutlined } from '@ant-design/icons';
import './index.scss';
//4.1对应映射的字段 
const mapState = ({ userInfoManager }) => ({



});
//4.2需要使用的http api接口 和 需要使用的方法
const mapDispatch = ({ userInfoManager }) => ({
  updatestudentPassword:userInfoManager.updatestudentPassword
});

const UserInfoManager = (props) => {
  const myInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  const gotoRepairManager = () => {
    window.location.href = "#/repairManager";

  }
 
  const [state,setState] = useState({
    visible: false,
    password:""
  });
  const showModal = () => {
    setState({
      ...state,
      visible: true,
    });
  };
const onChange = (e)=>{

  setState({
    ...state,
    password:e.target.value
  });

}
  const handleOk = e => {
    props.updatestudentPassword(
      {
        id:myInfo.id,
        password:state.password
      }
    );
    setState({
      ...state,
      visible: false,
    });
  };

  const handleCancel = e => {
 
    setState({
      ...state,
      visible: false,
    });
  };

  return (
    <div className="userInfoPage">
      <div className="page_head">
        <UnorderedListOutlined />
        <span>个人信息管理</span>


      </div>
      <div className="page_content">
        <p className="title">个人信息：</p>
        <div className="content_top">
          <div className="content_left">
            <p>账号名称：{myInfo.name}</p>
            <p>性别：{myInfo.sex === 1 ? "男" : "女"}</p>
            <p>电话：{myInfo.phone}</p>
          </div>
          <div className="content_right">

            <p>寝室编号：{myInfo.dormitory_number}</p>
            <p>班级：{myInfo.class_id}</p>
            <p>学号：{myInfo.student_id}</p>


          </div>
        </div>

        <div className="content_bottom">
          <p className="title">
            功能操作：
          </p>
          <div className="btn_wrapper">
            <Button type="primary" onClick={()=>showModal()}>修改密码！</Button>
            <Modal
              title="修改密码"
              visible={state.visible}
              onOk={()=>handleOk()}
              onCancel={()=>handleCancel()}
              okText="确认"
              cancelText="取消"
            >
              <Input type="password" placeholder="请输入新密码" onChange={(e)=>onChange(e)}/>
            </Modal>
            <Button style={{ "marginLeft": "40px" }} onClick={() => gotoRepairManager()}>我要报修！</Button>
          </div>



        </div>




      </div>
    </div>
  );
}



export default connect(
  mapState, mapDispatch
)(withRouter(UserInfoManager));