
import bgImg from '../../static/images/login_bgimg.png';
import './index.scss';
import React , { useEffect,useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Input, Button, Checkbox ,Radio  } from 'antd';
//4.1对应映射的字段 
const mapStateToProps = ({login}) => ({
  loginState:login.loginState

});
//4.2需要使用的http api接口 和 需要使用的方法
const mapDispatchToProps = ({login}) => ({
  userToLogin:login.userToLogin
});




const Login = (props) => {
  const [state,setState] = useState({
    peopleType:1
  
  });
  const layout = {
    labelAlign:'left',
    labelCol: {
      span: 8,
    },

  };
const chooseType = (e)=>{
 
  setState({
    ...state,
    peopleType:e.target.value
  });
}
  const onFinish = values => {
    console.log(values);
    let params = {
      ...values,
      // peopleType:state.peopleType
    }
    props.history.push("/home");
    // props.userToLogin(params);
    console.log(props);

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
            
              >
                <Form.Item
                  label="账号"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: '账号不能为空',
                    },
                  ]}
                >
                  <Input placeholder="请输入账号"/>
                </Form.Item>

                <Form.Item
                  label="密码"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: '密码不能为空',
                    },
                  ]}
                >
                  <Input.Password placeholder="请输入密码"/>
                </Form.Item>
                <Form.Item 
                  label=""
                  name="peopleType" 
                  >  
                  <Radio.Group onChange={(e)=>chooseType(e)} initialValues="1" value={state.peopleType}>
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
  mapStateToProps, mapDispatchToProps
)(withRouter(Login));