import React, { useEffect, useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table, Radio, Divider, Button, Modal, Form, Input ,Select } from 'antd';

import { HomeOutlined, UserOutlined, PlusOutlined,FormOutlined,CloseSquareOutlined,SearchOutlined } from '@ant-design/icons';
import './index.scss';
const { Option } = Select;


//4.1对应映射的字段 
const mapState = ({ systemManager }) => ({
  userInfo:systemManager.userInfo,
  listData: systemManager.listData,
  page_no:systemManager.page_no,
  page_size:systemManager.page_size,
  total:systemManager.total


});
//4.2需要使用的http api接口 和 需要使用的方法
const mapDispatch = ({ systemManager }) => ({
  getadmininfo: systemManager.getadmininfo,
  saveAdmininfo:systemManager.saveAdmininfo,
  deleteData: systemManager.deleteData,
  getAdmininfobyId:systemManager.getAdmininfobyId,
  updateAdmininfobyid:systemManager.updateAdmininfobyid
});

const SystemManager = (props) => {
  
 
  const [state, setState] = useState({
    id:0,
    visible: false,
    loading: false,
    modelTitle:"",
    listData:[],
    phone:""
  });
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      align:"center"
      // render: text => <a>{text}</a>,
    },
    {
      title: '账号',
      dataIndex: 'phone',
      align:"center"

    },
    {
      title:'账号权限',
      dataIndex: 'role_id',
      align:"center"
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      align:"center"

    }, {
      title: '操作',
      align:"center",

      dataIndex: '',
      key: 'x',
      render: (text, record) => <div className="eidt_btn_wrap"><FormOutlined className="edit_btn" onClick={()=>openlayer("修改信息",record.id)}/><CloseSquareOutlined onClick={()=>handleDelete(record.id)}/></div>,
    },
  ];
 
  useEffect(() => {
    console.log("update");
    let prams = {
      page_size:props.page_size,
      page_no:1
    }
    props.getadmininfo(prams);
   
  }, []);
  const [form] = Form.useForm();
  useEffect(() => {
   
    // setState({
    //   ...state,
    //   listData:props.listData
    // });
    console.log(props.userInfo.user);
    if(state.visible){
      form.setFieldsValue({user:{
        ...props.userInfo.user,
        "role_id":props.userInfo.user.role_id+''
      }});
    }
    
  }, [props.userInfo]);
   useEffect(() => {
   
    // setState({
    //   ...state,
    //   listData:props.listData
    // });
   console.log(props.page_no);
  }, [props.page_no]);
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
    let prams = values.user;

    if(state.modelTitle==="修改信息"){
      console.log(prams);
      prams={...prams,id:state.id};
      props.updateAdmininfobyid(prams,()=>{
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
          form.resetFields();
        }, 1000);
        let prams = {
          page_size:props.page_size,
          page_no:props.page_no
        }
        props.getadmininfo(prams);

    });
    }else{
      props.saveAdmininfo(prams,()=>{
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
          form.resetFields();
        }, 1000);
        let prams = {
          page_size:props.page_size,
          page_no:props.page_no
        }
        props.getadmininfo(prams);

    });

    }
    
    
   
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

  const addUser = (<Form {...layout} form={form}  name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>

    <Form.Item
      name={['user', 'name']}
      initialvalue="dsh"
      label="账号名称"
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
    <Input.Password/>
    </Form.Item>
    <Form.Item name={['user', 'role_id']} label="账户权限"  
    rules={[
      {
        required: true,
      },
    ]}
      >
    <Select style={{ width: 120 }} >
      <Option value="1">管理员</Option>
      <Option value="2">宿管员</Option>
      
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
    form.resetFields();
  };
  const openlayer = (val,id) => {
    if(id>=0){
      props.getAdmininfobyId({id});
    }
  
    setState({
      ...state,
      modelTitle:val,
      id:id,
      visible: true
    });
  }
  const handleDelete = (id)=>{
    // let nowData = state.listData.filter(item=>{
    //   console.log(id);
    //     return(item.id!==id);
    // });
    // console.log(nowData);
    let arr=[];
    arr.push(id);
    props.deleteData({
      ids:arr
    },()=>{
      let prams = {
        page_size:props.page_size,
        page_no:props.page_no
      }
      props.getadmininfo(prams);
      
    });
  }
  const changePage = (page,page_size)=>{
   
    let prams = {
      page_size:page_size,
      page_no:page
    }
    props.getadmininfo(prams);
  }
  const searchData = ()=>{
    props.getadmininfo({
      page_size:10,
      page_no:1,
      phone:state.phone
    });
  }
  const getSearchPhone = (e)=>{
      setState({
        ...state,
        phone:e.target.value
      });
  }
  return (
    <div className="systemPage">
      <div className="top_btn">
        <div className="btn_wrap" onClick={() => openlayer("新增账号",-1)}>
          <Button type="primary" block={true}>
            <PlusOutlined />
                  新增
              </Button>

        </div>
        <div className="search_wrap">

          <Input  className="search_input" placeholder="请输入账号" onChange={(e)=>getSearchPhone(e)}/>
          <Button type="primary" icon={<SearchOutlined />} onClick={()=>searchData()}>
            搜索
          </Button>
        </div>
      </div>
        <Modal
          forceRender
          
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
          dataSource={props.listData}
          pagination={{ position: ['bottomRight'], pageSize: 10 ,total:props.total,onChange:changePage,current:props.page_no}}
        />
      

    </div>
  );
}



export default connect(
  mapState, mapDispatch
)(withRouter(SystemManager));