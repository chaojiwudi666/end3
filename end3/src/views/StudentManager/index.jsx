import React, { useEffect, useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table, Radio, Divider, Button, Modal, Form, Input ,Select } from 'antd';

import { HomeOutlined, UserOutlined, PlusOutlined,FormOutlined,CloseSquareOutlined } from '@ant-design/icons';
import './index.scss';
const { Option } = Select;


//4.1对应映射的字段 
const mapState = ({ studentManager }) => ({
  userInfo:studentManager.userInfo,
  listData: studentManager.listData,
  page_no:studentManager.page_no,
  page_size:studentManager.page_size,
  total:studentManager.total


});
//4.2需要使用的http api接口 和 需要使用的方法
const mapDispatch = ({ studentManager }) => ({
  getStudentinfo: studentManager.getStudentinfo,
  saveStudentinfo:studentManager.saveStudentinfo,
  deleteData: studentManager.deleteData,
  getStudentinfobyId:studentManager.getStudentinfobyId,
  updateStudentinfobyid:studentManager.updateStudentinfobyid
});

const StudentManager = (props) => {
  
 
  const [state, setState] = useState({
    id:0,
    visible: false,
    loading: false,
    modelTitle:"",
    listData:[],
  });
  const columns = [
    {

      title: '学号',
      dataIndex: 'student_id',
      align:"center"
      // render: text => <a>{text}</a>,
    },
    {

      title: '班级',
      dataIndex: 'class_id',
      align:"center"
      // render: text => <a>{text}</a>,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      align:"center"
      // render: text => <a>{text}</a>,
    },
    {
      title:'性别',
      dataIndex: 'sex',
      align:"center"
    },
    {
      title: '寝室编号',
      dataIndex: 'dormitory_id',
      align:"center"

    },
    {
      title: '联系方式',
      dataIndex: 'phone',
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
    props.getStudentinfo(prams);
   
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
        "sex":props.userInfo.user.sex+''
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
      props.updateStudentinfobyid(prams,()=>{
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
        let prams = {
          page_size:props.page_size,
          page_no:props.page_no
        }
        props.getStudentinfo(prams);

    });
    }else{
      props.saveStudentinfo(prams,()=>{
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
        let prams = {
          page_size:props.page_size,
          page_no:props.page_no
        }
        props.getStudentinfo(prams);

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
      label="姓名"
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
    
    <Form.Item 
    name={['user', 'dormitory_id']}
   

    label="寝室编号"
    rules={[
      {
        required: true,
      },
    ]}>
    <Input/>
    </Form.Item>
    <Form.Item 
    name={['user', 'class_id']}
   

    label="班级"
    rules={[
      {
        required: true,
      },
    ]}>
    <Input/>
    </Form.Item>
    <Form.Item name={['user', 'sex']} label="性别"  
    rules={[
      {
        required: true,
      },
    ]}
      >
    <Select style={{ width: 120 }} >
      <Option value="1">男</Option>
      <Option value="2">女</Option>
      
       
   
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
  };
  const openlayer = (val,id) => {
    if(id>=0){
      props.getStudentinfobyId({id});
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
      props.getStudentinfo(prams);
      
    });
  }
  const changePage = (page,page_size)=>{
   
    let prams = {
      page_size:page_size,
      page_no:page
    }
    props.getStudentinfo(prams);
  }
  return (
    <div className="systemPage">
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
)(withRouter(StudentManager));