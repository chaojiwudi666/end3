import React , { useEffect,useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { Table, Radio, Divider, Button, Modal, Form, Input ,DatePicker} from 'antd';

import { HomeOutlined, UserOutlined, PlusOutlined,FormOutlined,CloseSquareOutlined } from '@ant-design/icons';
import './index.scss';
//4.1对应映射的字段 
const mapState = ({visitManager}) => ({
  listData:visitManager.listData,
  page_no:visitManager.page_no,
  page_size:visitManager.page_size,
  total:visitManager.total,
  userInfo:visitManager.userInfo,

});
//4.2需要使用的http api接口 和 需要使用的方法
const mapDispatch = ( {visitManager} ) => ({
  saveVisitorinfo:visitManager.saveVisitorinfo,
  getVisitorinfo:visitManager.getVisitorinfo,
  deleteData: visitManager.deleteData,
  getVisitorinfobyId:visitManager.getVisitorinfobyId,
  updateVisitorinfobyid:visitManager.updateVisitorinfobyid
});

const VisitManager = (props)=> {
  useEffect(()=>{
    let prams = {
      page_no:1,
      page_size:props.page_size
    }
    props.getVisitorinfo(prams);
  },[]);
 
  useEffect(()=>{
    console.log(props.page_no);
  },[props.page_no]);
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
  const [form] = Form.useForm();
  useEffect(() => {
   
    // setState({
    //   ...state,
    //   listData:props.listData
    // });
    console.log(props.userInfo.user);
    console.log(moment(props.userInfo.user.update_time, 'YYYY-MM-DD HH:mm:ss'));
    if(state.visible){
      form.setFieldsValue({user:{
        ...props.userInfo.user,
       "update_time":moment(props.userInfo.user.update_time, 'YYYY-MM-DD HH:mm:ss')
      }});
    }
    
  }, [props.userInfo]);
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
          dataIndex: 'update_time',
          align:"center"
        }, {
          title: '操作',
          align:"center",
    
          dataIndex: '',
          key: 'x',
          render: (text, record) => <div className="eidt_btn_wrap"><FormOutlined className="edit_btn" onClick={()=>openlayer("修改信息",record.id)}/><CloseSquareOutlined onClick={()=>handleDelete(record.id)}/></div>,
        },
      ];
      
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
          console.log(moment(values.user.createTime).format('YYYY-MM-DD HH:mm:ss'));

          let prams = {
            phone:values.user.phone,
            student_name:values.user.student_name,
            name:values.user.name,
            remark:values.user.remark,
            update_time:moment(values.user.createTime).format('YYYY-MM-DD HH:mm:ss')
          }
          if(state.modelTitle==="修改信息"){
            console.log(prams);
            
            prams={...prams,id:state.id};
            props.updateVisitorinfobyid(prams,()=>{
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
                console.log(prams);
                form.setFieldsValue({user:{
                  phone:'',
                  student_name:"",
                  name:"",
                  remark:"",
                 
                  "update_time":moment(prams.update_time, 'YYYY-MM-DD HH:mm:ss')
                }});
                // form.resetFields();
              }, 1000);
              let data = {
                page_size:props.page_size,
                page_no:props.page_no
              }
              props.getVisitorinfo(data);
      
          });
          }else{
            props.saveVisitorinfo(prams,()=>{
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
                form.setFieldsValue({user:{
                  phone:'',
                  student_name:"",
                  name:"",
                  remark:"",
                 
                  "update_time":moment(prams.update_time, 'YYYY-MM-DD HH:mm:ss')
                }});
                // form.resetFields();
              }, 1000);
              let data = {
                page_size:props.page_size,
                page_no:props.page_no
              }
              props.getVisitorinfo(data);
      
          });
      
          }
          
          
         
        };
      
        // let parmas = {
        //   phone:values.visitor.phone,
        //   student_name:values.visitor.student_name,
        //   name:values.visitor.name,
        //   remark:values.visitor.remark,
        //   update_time:moment(values.visitor.createTime).format('YYYY-MM-DD HH:mm:ss')
        // }
        // props.saveVisitorinfo(parmas,()=>{
        //   setState({
        //     ...state,
        //     loading: true
        //   });
        //   setTimeout(() => {
        //     setState({
        //       ...state,
        //       loading: false,
        //       visible: false
        //     });
        //     form.resetFields();
        //   }, 1000);
        //   let prams = {
        //     page_size:props.page_size,
        //     page_no:props.page_no
        //   }
        //   props.getVisitorinfo(prams);


        // });

        
   
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
    const changePage = (page,page_size)=>{
      let prams = {
        page_no:page,
        page_size:page_size
      }
      props.getVisitorinfo(prams);
    }
      const addUser = (<Form {...layout} form={form} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} initialValues = {props.userInfo}>

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
      name={['user', 'update_time']}
     
  
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
      form.setFieldsValue({user:{
        phone:'',
        student_name:"",
        name:"",
        remark:"",
       
        
      }});
      // form.resetFields();
    };
    const openlayer = (val,id) => {
      if(id>=0){
        props.getVisitorinfobyId({id});
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
        props.getVisitorinfo(prams);
        
      });
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
)(withRouter(VisitManager));