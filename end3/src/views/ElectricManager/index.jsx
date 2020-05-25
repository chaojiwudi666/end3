import React, { useEffect, useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table, Radio, Divider, Button, Modal, Form, Input ,Select,message } from 'antd';
import ExportJsonExcel from "js-export-excel";
import { HomeOutlined, UserOutlined, PlusOutlined,FormOutlined,CloseSquareOutlined,DiffOutlined } from '@ant-design/icons';
import './index.scss';
const { Option } = Select;
message.config({
  top: 20,
  duration: 1,
  maxCount: 3,
  rtl: true,
});

//4.1对应映射的字段 
const mapState = ({ electricManager }) => ({
  userInfo:electricManager.userInfo,
  listData: electricManager.listData,
  page_no:electricManager.page_no,
  page_size:electricManager.page_size,
  total:electricManager.total


});
//4.2需要使用的http api接口 和 需要使用的方法
const mapDispatch = ({ electricManager }) => ({
  getelectricityinfo: electricManager.getelectricityinfo,
  saveelectricityinfo:electricManager.saveelectricityinfo,
  deleteData: electricManager.deleteData,
  getelectricityinfobyId:electricManager.getelectricityinfobyId,
  updateelectricityinfobyid:electricManager.updateelectricityinfobyid
});

const ElectricManager = (props) => {
  
 
  const [state, setState] = useState({
    id:0,
    visible: false,
    loading: false,
    modelTitle:"",
    listData:[],
  });
  const columns = [
    {

      title: '宿舍编号',
      dataIndex: 'dormitory_number',
      align:"center"
      // render: text => <a>{text}</a>,
    },
    {

      title: '历史度数',
      dataIndex: 'degrees_history',
      align:"center"
      // render: text => <a>{text}</a>,
    },
    {
      title: '当月度数',
      dataIndex: 'current',
      align:"center"
      // render: text => <a>{text}</a>,
    },
    {
      title:'电费单价',
      dataIndex: 'price',
      align:"center"
    },
    {
      title: '本月电费',
      dataIndex: 'balance',
      align:"center"

    },{
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
    props.getelectricityinfo(prams);
   
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


//调用方法
const downloadExcel = () => {      
      var option={};
      let dataTable = [];
      if (props.listData) {
        props.listData.forEach((item,index)=>{
          let obj = {
            '寝室编号': item.dormitory_number,
            '历史度数': item.degrees_history,
            '当月度数': item.current,
            "电费单价": item.price,
            "本月电费": item.balance,
          }
          dataTable.push(obj);
        });


        // for (let i in props.listData) {
         
        //     let obj = {
        //       '项目名称': currentPro.data[i].name,
        //       '项目地址': currentPro.data[i].address,
        //       '考勤范围': currentPro.data[i].radius,
        //     }
        //     dataTable.push(obj);
          
        // }
      }
      option.fileName = '寝室电费'
      option.datas=[
        {
          sheetData:dataTable,
          sheetName:'sheet',
          sheetFilter:['寝室编号','历史度数','当月度数','电费单价','本月电费'],
          sheetHeader:['寝室编号','历史度数','当月度数','电费单价','本月电费'],
        }
      ];
  
      var toExcel = new ExportJsonExcel(option); //new
      toExcel.saveExcel();
    }













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
  // const onValuesChange = (pro, changedValues)=>{        
  //     if(changedValues.user.current&&changedValues.user.degrees_history){
  //       if(changedValues.user.degrees_history>changedValues.user.current){
  //         form.setFieldsValue({user:{
  //           ...changedValues.user,
  //           "current":changedValues.user.degrees_history
          
  //         }});

  //       }
        
  //     }


    
   
  // }
  const onFinish = values => {
    let prams = values.user;

    if(state.modelTitle==="修改信息"){
      if(prams.degrees_history>prams.current){
        message.error("当月读书度数不能小于历史度数");
        return;
      }
      console.log(prams);
      prams={...prams,id:state.id};
      props.updateelectricityinfobyid(prams,()=>{
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
        props.getelectricityinfo(prams);

    });
    }else{
      props.saveelectricityinfo(prams,()=>{
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
        props.getelectricityinfo(prams);

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

  const addUser = (<Form {...layout} form={form}  name="nest-messages" 
  // onValuesChange={onValuesChange} 
  onFinish={onFinish} validateMessages={validateMessages}>
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
      name={['user', 'degrees_history']}
     
      label="历史度数"
      rules={[
        {
          required: true,
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name={['user', 'current']}
   
      label="当月度数"
      rules={[
        {
          required: true,
        },
      ]}
    >
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
    form.resetFields();
  };
  const openlayer = (val,id) => {
  
    if(id>=0){
      props.getelectricityinfobyId({id});
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
    console.log(id);
    let arr=[];
    arr.push(id);
    props.deleteData({
      ids:arr
    },()=>{
      let prams = {
        page_size:props.page_size,
        page_no:props.page_no
      }
      props.getelectricityinfo(prams);
      
    });
  }
  const changePage = (page,page_size)=>{
   
    let prams = {
      page_size:page_size,
      page_no:page
    }
    props.getelectricityinfo(prams);
  }
  return (
    <div className="electricManager">
      <div>
        <div className="btn_wrap" onClick={() =>downloadExcel()}>
          <Button type="primary" block={true}>
          <DiffOutlined />
                  导出成Excel
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
)(withRouter(ElectricManager));