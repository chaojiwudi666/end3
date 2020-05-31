import React, { useEffect, useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table, Radio, Divider, Button, Modal, Form, Input ,Select,message,Rate  } from 'antd';
import ExportJsonExcel from "js-export-excel";
import { HomeOutlined, UserOutlined, PlusOutlined,FormOutlined,CloseSquareOutlined,DiffOutlined,SearchOutlined } from '@ant-design/icons';
import './index.scss';
const { Option } = Select;
message.config({
  top: 20,
  duration: 1,
  maxCount: 3,
  rtl: true,
});

//4.1对应映射的字段 
const mapState = ({ hygieneManager }) => ({
  userInfo:hygieneManager.userInfo,
  listData: hygieneManager.listData,
  page_no:hygieneManager.page_no,
  page_size:hygieneManager.page_size,
  total:hygieneManager.total


});
//4.2需要使用的http api接口 和 需要使用的方法
const mapDispatch = ({ hygieneManager }) => ({
  gethygieneinfo: hygieneManager.gethygieneinfo,
  savehygieneinfo:hygieneManager.savehygieneinfo,
  deleteData: hygieneManager.deleteData,
  gethygieneinfobyId:hygieneManager.gethygieneinfobyId,
  updatehygieneinfobyid:hygieneManager.updatehygieneinfobyid
});

const HygieneManager = (props) => {
  
 
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

      title: '宿舍编号',
      dataIndex: 'dormitory_number',
      align:"center"
      // render: text => <a>{text}</a>,
    },
    {

      title: '寝室卫生评分',
      dataIndex: 'hygienic_condition',
      align:"center",
    render:  text=> <Rate value={text} disabled/>,
    },
    {
      title: '评分时间',
      dataIndex: 'update_time',
      align:"center",
     
    },{
      title: '操作',
      align:"center",

      dataIndex: '',
      key: 'x',
      render: (text, record) => <div className="eidt_btn_wrap"><FormOutlined className="edit_btn" onClick={()=>openlayer("修改信息",record.id)}/></div>,
    },
  ];
 
  useEffect(() => {
    console.log("update");
    let prams = {
      page_size:props.page_size,
      page_no:1
    }
    props.gethygieneinfo(prams);
   
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
   console.log(props.listData);
  }, [props.listData]);


//调用方法
const downloadExcel = () => {      
      var option={};
      let dataTable = [];
      if (props.listData) {
        props.listData.forEach((item,index)=>{
          let obj = {
            '寝室编号': item.dormitory_number,
            '评分': item.hygienic_condition,
            
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
      option.fileName = '寝室卫生评分'
      option.datas=[
        {
          sheetData:dataTable,
          sheetName:'sheet',
          sheetFilter:['寝室编号','评分'],
          sheetHeader:['寝室编号','评分'],
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
     
      console.log(prams);
      prams={...prams,id:state.id};
      props.updatehygieneinfobyid(prams,()=>{
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
        props.gethygieneinfo(prams);

    });
    }else{
      props.savehygieneinfo(prams,()=>{
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
        props.gethygieneinfo(prams);

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
      
    >
      <Input readOnly/>
    </Form.Item>
    <Form.Item
      name={['user', 'hygienic_condition']}
     
      label="寝室卫生评分"
      rules={[
        {
          required: true,
        },
      ]}
    >
      <Rate />
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
      props.gethygieneinfobyId({id});
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
      props.gethygieneinfo(prams);
      
    });
  }
  const changePage = (page,page_size)=>{
   
    let prams = {
      page_size:page_size,
      page_no:page
    }
    props.gethygieneinfo(prams);
  }
  const searchData = ()=>{
    props.gethygieneinfo({
      page_size:10,
      page_no:1,
      dormitory_number:state.dormitory_number
    });
  }
  const getSearchPhone = (e)=>{
      setState({
        ...state,
        dormitory_number:e.target.value
      });
  }
  return (
    <div className="hygieneManager">
      <div className="top_btn">
        <div className="btn_wrap" onClick={() =>downloadExcel()}>
          <Button type="primary" block={true}>
          <DiffOutlined />
                  导出成Excel
              </Button>

        </div>
        <div className="search_wrap">

          <Input  className="search_input" placeholder="请输入寝室编号" onChange={(e)=>getSearchPhone(e)}/>
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
)(withRouter(HygieneManager));