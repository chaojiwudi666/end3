import React , { useEffect,useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { Table, Radio, Divider, Button, Modal, Form, Input ,DatePicker} from 'antd';

import { HomeOutlined, UserOutlined, PlusOutlined,FormOutlined,CloseSquareOutline } from '@ant-design/icons';
import './index.scss';
//4.1对应映射的字段 
const mapState = ({visitManager}) => ({
  listData:visitManager.listData,
  pageNo:visitManager.pageNo,
  pageSize:visitManager.pageSize,
  total:visitManager.total


});
//4.2需要使用的http api接口 和 需要使用的方法
const mapDispatch = ( {visitManager} ) => ({
  saveVisitorinfo:visitManager.saveVisitorinfo,
  getVisitorinfo:visitManager.getVisitorinfo
});

const VisitManager = (props)=> {
  useEffect(()=>{
    let prams = {
      pageNo:1,
      pageSize:10
    }
    props.getVisitorinfo(prams);
  },[]);
  const [state, setState] = useState({
    visible: false,
    loading: false,
    modelTitle:"",
    listData:props.listData,
    total:props.total
  });
  useEffect(()=>{
    setState({
      ...state,
      total:props.total
    });
  },[props.total]);
  useEffect(()=>{
    setState({
      ...state,
      listData:props.listData
    });
  },[props.listData]);
    const columns = [
        {
          title: '访客姓名',
          dataIndex: 'name',
          align:"center"
        },
        {
          title: '访客联系方式',
          dataIndex: 'phone',
          align:"center"

        },
        {
          title: '学生姓名',
          dataIndex: 'student_name',
          align:"center"
        },{
          title: '来访时间',
          dataIndex: 'create_time',
          align:"center"
        },
      ];
      const data = [
        {
          key: '0',
          name: 'John Brown',
          phone: 123923723780,
          
          studentName:"dsh",
          createTime:"2020/0811"
        },
        {
          key: '1',
          name: 'John Brown',
          phone: 123923723780,
          
          studentName:"dsh",
          createTime:"2020/0811"
        },
        {
          key: '2',
          name: 'John Brown',
          phone: 123923723780,
          
          studentName:"dsh",
          createTime:"2020/0811"
        },
        {
          key: '3',
          name: 'John Brown',
          phone: 123923723780,
          
          studentName:"dsh",
          createTime:"2020/0811"
        },
      ]; // rowSelection object indicates the need for row selection
      
      const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
          disabled: record.name === 'Disabled User',
          // Column configuration not to be checked
          name: record.name,
        }),
      };
      const onFinish = values => {
        console.log(moment(values.user.createTime).format('YYYY-MM-DD HH:mm:ss') );
        props.saveVisitorinfo({
          name:"dsh",
          phone:13505727728,
          student_name:"dsh",
          student_id:1,
          create_user:"dsh"

        });

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
    const changePage = (page)=>{
      let prams = {
        pageNo:page,
        pageSize:10
      }
      props.getVisitorinfo(prams);
    }
      const addUser = (<Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} initialValues = {props.userInfo}>

      <Form.Item
        name={['user', 'name']}
        label="访客姓名"
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
     
        label="访客联系方式"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
     
      <Form.Item 
      name={['user', 'student_name']}
     
  
      label="学生姓名"
      rules={[
        {
          required: true,
        },
      ]}>
        <Input />
      </Form.Item>
      <Form.Item 
      name={['user', 'create_time']}
     
  
      label="来访时间"
      rules={[
        {
          required: true,
        },
      ]}>
        <DatePicker showTime placeholder="请选择时间" format="YYYY-MM-DD HH:mm:ss"/>
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
      <div className="visitManager">
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
                pagination={{ position: ['bottomRight'], pageSize: 10 ,total:state.total,onChange:changePage}}
            />
            </div>
         
      </div>
    );
  }



export default connect(
  mapState, mapDispatch
)(withRouter(VisitManager));