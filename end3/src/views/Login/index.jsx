
import bgImg from '../../static/images/login_bgimg.png';
import './index.scss';
import React , { useEffect,useRef, useState } from './node_modules/react';
import { withRouter } from './node_modules/react-router-dom';
import { connect } from './node_modules/react-redux';
import { Form, Input, Button, Checkbox ,Radio  } from './node_modules/antd';
//4.1对应映射的字段 
const mapState = ({ login }) => ({

});
//4.2需要使用的http api接口 和 需要使用的方法
const mapDispatch = ({ login }) => ({

});
const layout = {
  labelAlign:'left',
  labelCol: {
    span: 8,
  },

};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
const onFinish = values => {
  
};

const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};
const onChange = e => {
  console.log('radio checked', e.target.value);
  this.setState({
    value: e.target.value,
  });
}; 
const Login = (props) => {
  state = {
    value: 1,
  };
    return (
      <div className="loginPage">
        <div className="wapper">
          <h1>学生宿舍信息管理系统——cms后台管理系统</h1>
          <div className="login-container">
            <img src={bgImg} className='bgImg' alt="" />
            <div className="flex-box">
              <Form
                {...layout}
                name="basic"
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  label="账号"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your username!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="密码"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item 
                  label=""
                  name="peopleType" >  
                  <Radio.Group name="radiogroup" defaultValue={1} >
                    <Radio value={1}>管理员</Radio>
                    <Radio value={2}>宿管员</Radio>
                    <Radio value={3}>学生</Radio>
                    
                  </Radio.Group>
                  </Form.Item>

                <Form.Item  style={{"marginTop":"60px"}}>
                  <Button type="primary" htmlType="submit">
                    登录
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>

      </div>
    );
  

}

export default connect(
  mapState, mapDispatch
)(withRouter(Login));