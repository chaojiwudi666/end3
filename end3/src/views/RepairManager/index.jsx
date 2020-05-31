import React, { useEffect, useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table, Radio, Divider, Button, Modal, Form, Input ,Select, Popconfirm, message  } from 'antd';

import { HomeOutlined, UserOutlined, PlusOutlined,FormOutlined,CloseSquareOutlined } from '@ant-design/icons';
import './index.scss';
const { Option } = Select;


//4.1对应映射的字段 
const mapState = ({ repairManager }) => ({
  userInfo:repairManager.userInfo,
  listData: repairManager.listData,
  page_no:repairManager.page_no,
  page_size:repairManager.page_size,
  total:repairManager.total,
  dormitory_number:repairManager.dormitory_number


});
//4.2需要使用的http api接口 和 需要使用的方法
const mapDispatch = ({ repairManager }) => ({
  getmaintenanceinfo: repairManager.getmaintenanceinfo,
  savemaintenanceinfo:repairManager.savemaintenanceinfo,
  deleteData: repairManager.deleteData,
  getmaintenanceinfobyId:repairManager.getmaintenanceinfobyId,
  updatemaintenanceinfobyid:repairManager.updatemaintenanceinfobyid,
  updatemaintenancestatebyid:repairManager.updatemaintenancestatebyId,
  
});

const RepairManager = (props) => {
  
 
  const [state, setState] = useState({
    id:0,
    visible: false,
    loading: false,
    modelTitle:"",
    listData:[],
    dormitory_number:""
  });
  const columns = [


    {
      title: '寝室编号',
      dataIndex: 'dormitory_number',
      align:"center"

    },
    {
      title: '维修类型',
      dataIndex: 'maintenance_type',
      align:"center"
      // render: text => <a>{text}</a>,
    },
 
    {
      title: '联系方式',
      dataIndex: 'phone',
      align:"center"

    },{
      title: '报修时间',
      dataIndex: 'create_time',
      align:"center"

    }, {
      title: "维修状态",
      align:"center",
      dataIndex: 'state',     
      render: (text, record) => state.dormitory_number?(text===1?<div style={{"color":"green"}}>未维修</div>:<div style={{"color":"red"}}>已维修</div>):(text===1?<Popconfirm
      title="确定已维修?"
      onConfirm={()=>changeState(record.id)}
      // onCancel={cancel}
      okText="确定"
      cancelText="取消"
    >
      <a href="#" style={{"color":"green"}}>未维修</a>
    </Popconfirm>:<div style={{"color":"red"}}>已维修</div>)
    },{
      title: '操作',
      align:"center",

      dataIndex: '',
      key: 'x',
      render: (text, record) => <div className="eidt_btn_wrap"><FormOutlined className="edit_btn" onClick={()=>openlayer("修改信息",record.id)}/><CloseSquareOutlined onClick={()=>handleDelete(record.id)}/></div>,
    },
  ];
  const changeState = (id)=>{
    let parmas = {
      id:id
    }
    props.updatemaintenancestatebyid(parmas,()=>{
      let prams = {
        page_size:props.page_size,
        page_no:props.page_no
      }
   
      if(state.dormitory_number){
        prams.dormitory_number=state.dormitory_number;
      }
      props.getmaintenanceinfo(prams);


    });


  }
 
  useEffect(() => {
    let prams;
    let dormitory_number = JSON.parse(sessionStorage.getItem("userInfo")).dormitory_number;
    setState({
      ...state,
      dormitory_number:dormitory_number
    });
    console.log(dormitory_number);
   
    if(dormitory_number){
      
      prams= {
        dormitory_number:dormitory_number,
        page_size:props.page_size,
        page_no:1
      }

    }else{
      prams = {
       
        page_size:props.page_size,
        page_no:1
      }

    }
   
    
    props.getmaintenanceinfo(prams);
   
  }, []);
  const [form] = Form.useForm();
  useEffect(() => {
   
    // setState({
    //   ...state,
    //   listData:props.listData
    // });
    console.log("userInfo",state.dormitory_number);
    if(state.visible){
      form.setFieldsValue({user:{
        ...props.userInfo.user,
      
        "maintenance_type":props.userInfo.user.maintenance_type+''
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
    console.log(values);
    if(state.modelTitle==="修改信息"){
      console.log(prams);
      prams={...prams,id:state.id};
      props.updatemaintenanceinfobyid(prams,()=>{
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
        if(state.dormitory_number){
          prams.dormitory_number=state.dormitory_number;
        }
        props.getmaintenanceinfo(prams);

    });
    }else{
      props.savemaintenanceinfo(prams,()=>{
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
        if(state.dormitory_number){
          prams.dormitory_number=state.dormitory_number;
        }
        props.getmaintenanceinfo(prams);

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
      name={['user', 'dormitory_number']}
      
      label="寝室编号"
      rules={[
        {
          required: true,
        },
      ]}
    >
      <Input readOnly={state.dormitory_number?"readOnly":""}/>
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

      props.getmaintenanceinfobyId({id});
    }
    
  
    setState({
      ...state,
      modelTitle:val,
      id:id,
      visible: true
    });
    if(id=-1){
      if(state.dormitory_number){
        form.setFieldsValue({user:{
 
          "dormitory_number":state.dormitory_number,
        
        }});
      }
    }
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
      if(state.dormitory_number){
        prams.dormitory_number=state.dormitory_number;
      }
      props.getmaintenanceinfo(prams);
      
    });
  }
  const changePage = (page,page_size)=>{
   
    let prams = {
      page_size:page_size,
      page_no:page
    }
    if(state.dormitory_number){
      prams.dormitory_number=state.dormitory_number;
    }
    props.getmaintenanceinfo(prams);
  }
  return (
    <div className="repairManager">
      <div>
        <div className="btn_wrap" onClick={() => openlayer("新增账号",-1)}>
          <Button type="primary" block={true}>
            <PlusOutlined />
                  新增
              </Button>

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

    </div>
  );
}



export default connect(
  mapState, mapDispatch
)(withRouter(RepairManager));