import React, { useEffect, useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table, Radio, Divider, Button, Modal, Form, Input ,Select } from 'antd';

import { HomeOutlined, UserOutlined, PlusOutlined,FormOutlined,CloseSquareOutlined } from '@ant-design/icons';
import './index.scss';
const { Option } = Select;


//4.1对应映射的字段 
const mapState = ({ dormrepair }) => ({
 

});
//4.2需要使用的http api接口 和 需要使用的方法
const mapDispatch = ({ dormrepair }) => ({
 
});

const Dormrepair = (props) => {
  const [state, setState] = useState({
    id:0,
    visible: false,
    loading: false,
    modelTitle:"",
    listData:[],
  });
  const [form] = Form.useForm();
  const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const validateMessages = {
    required: '${label}不能为空!',
  };
 
  const onFinish = values => {
 
  };
  useEffect(()=>{




  },[]);
  return (
    <div className="dormrepair">
      <p className="page_title">我要报修</p>
      <div className="page_content">
      <Form {...layout} form={form}  name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>

          <Form.Item
            name={['user', 'dormitory_number']}

            label="寝室编号"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['user', 'phone']}

            label="联系方式"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
            

          <Form.Item name={['user', 'maintenance_type']} label="维修类型"  
          rules={[
            {
              required: true,
            },
          ]}
            >
          <Select style={{ width: 120 }} >
            <Option value="0">地面/地砖</Option>
            <Option value="1">电器/开关/线路</Option>
            <Option value="2">卫浴洁具类</Option>
            <Option value="3">床/书橱/椅子</Option>
            <Option value="4">管道堵塞疏通</Option>
            <Option value="5">门窗</Option>  
            <Option value="6">其他</Option>          
          </Select>
          </Form.Item>
          <Form.Item name={['user', 'remark']} label="备注" 
          
            >
          <Input.TextArea />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit" key="submit" loading={state.loading} style={{marginRight:"20px"}}>
              保存
            </Button>
          
          </Form.Item>
          </Form>
      </div>
    </div>
  );
}



export default connect(
  mapState, mapDispatch
)(withRouter(Dormrepair));