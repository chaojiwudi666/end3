import React, { useEffect, useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table, Radio, Divider, Button, Modal, Form, Input } from 'antd';

import { HomeOutlined, UserOutlined, PlusOutlined,FormOutlined,CloseSquareOutlined } from '@ant-design/icons';
import './index.scss';
//4.1对应映射的字段 
const mapState = ({ dormManager }) => ({
 
  listData:dormManager.listData

});
//4.2需要使用的http api接口 和 需要使用的方法
const mapDispatch = ({ dormManager }) => ({
 
});

const DormManager = (props) => {
  const [state, setState] = useState({
    visible: false,
    loading: false,
    modelTitle:"",
    listData:props.listData,
  });
  const columns = [
    {
      title: '寝室编号',
      align:'center',
      dataIndex: 'dormitoryNumber',
      // render: text => <a>{text}</a>,
    },
    {
      title: '寝室楼编号',
      align:'center',
      dataIndex: 'hostelId',
    },
    {
      title: '寝室长',
      align:'center',
      dataIndex: 'leader',
    }, {
      title: '操作',
      align:'center',
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
      listData:props.listData
    });
    console.log(props.listData);
  }, [props.listData]);
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

  const eidtModel = (<Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} initialValues = {props.userInfo}>

    <Form.Item
      name={['user', 'leader']}
      label="寝室长"
      rules={[
        {
          required: true,
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name={['user', 'docNumber']}
   
      label="寝室成员"
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
    <div className="dormManager">
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
          {eidtModel}
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
)(withRouter(DormManager));