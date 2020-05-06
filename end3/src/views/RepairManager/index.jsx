import React, { useEffect, useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table, Radio, Divider, Button, Modal, Form, Input } from 'antd';

import { HomeOutlined, UserOutlined, PlusOutlined,FormOutlined,CloseSquareOutlined } from '@ant-design/icons';
import './index.scss';
//4.1对应映射的字段 
const mapState = ({ systemManager }) => ({
  userInfo:systemManager.userInfo,
  data: systemManager.data,


});
//4.2需要使用的http api接口 和 需要使用的方法
const mapDispatch = ({ systemManager }) => ({
  getadmininfo: systemManager.getadmininfo,
  deleteData: systemManager.deleteData
});

const RepairManager = (props) => {
  const [state, setState] = useState({
    visible: false,
    loading: false,
    modelTitle:"",
    listData:props.data,
  });
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      // render: text => <a>{text}</a>,
    },
    {
      title: '账号',
      dataIndex: 'age',
    },
    {
      title: '创建时间',
      dataIndex: 'address',
    }, {
      title: '操作',
      dataIndex: '',
      key: 'x',
      render: (text, record) => <div className="eidt_btn_wrap"><FormOutlined className="edit_btn" onClick={()=>openlayer("修改信息")}/><CloseSquareOutlined onClick={()=>handleDelete(record.key)}/></div>,
    },
  ];
  // const editModelshow = (val)=>{
  //     setState({
  //       ...state,
  //       visible:true
  //     });
  // }
  useEffect(() => {
    // props.getadmininfo();
    setState({
      ...state,
      listData:props.data
    });
    console.log(props.data);
  }, [props.data]);
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
      // disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name,
    }),
  };
  const onFinish = values => {

    setState({
      ...state,
      loading: true
    });
    setTimeout(() => {
      setState({
        ...state,
        loading: false,
        visible: false
      });
    }, 1000);
    console.log(values);
  };
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

  const addUser = (<Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} initialValues = {props.userInfo}>

    <Form.Item
      name={['user', 'name']}
      initialvalue="dsh"
      label="账户名称"
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
   
      label="账号(电话)"
      rules={[
        {
          required: true,
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item 
    name={['user', 'password']}
   

    label="密码"
    rules={[
      {
        required: true,
      },
    ]}>
      <Input />
    </Form.Item>
    <Form.Item name={['user', 'remark']} label="备注" 
     
      >
    <Input.TextArea />
    </Form.Item>
    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
      <Button type="primary" htmlType="submit" key="submit" loading={state.loading} style={{marginRight:"20px"}}>
        保存
      </Button>
      <Button key="back" onClick={() => handleCancel()}>
          取消
      </Button>,
    </Form.Item>
  </Form>);
  
  const handleCancel = () => {
    setState({
      ...state,
      visible: false
    });
  };
  const openlayer = (val) => {
    console.log(val);
    setState({
      ...state,
      modelTitle:val,
      visible: true
    });
  }
  const handleDelete = (key)=>{
    let nowData = state.listData.filter(item=>{
      console.log(key);
        return(item.key!==key);
    });
    console.log(nowData);
    props.deleteData(nowData);
  }

  return (
    <div className="systemPage">
      <div>
        <div className="btn_wrap" onClick={() => openlayer("新增账号")}>
          <Button type="primary" block={true}>
            <PlusOutlined />
                  新增
              </Button>

        </div>
        <Modal
          title={state.modelTitle}
          visible={state.visible}
          closable={false}
          destroyOnClose={true}
          // onOk={this.handleOk}
          // onCancel={this.handleCancel}
          footer={null}
        >
          {addUser}
        </Modal>


        <Divider />

        <Table
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          columns={columns}
          dataSource={state.listData}
          pagination={{ position: ['bottomRight'], pageSize: 10 }}
        />
      </div>

    </div>
  );
}



export default connect(
  mapState, mapDispatch
)(withRouter(RepairManager));