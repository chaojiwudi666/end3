import React, { useEffect, useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table, Radio, Divider, Button, Modal } from 'antd';

import { HomeOutlined, UserOutlined, PlusOutlined, } from '@ant-design/icons';
import './index.scss';
//4.1对应映射的字段 
const mapState = ({ systemManager }) => ({

  data: systemManager.data,


});
//4.2需要使用的http api接口 和 需要使用的方法
const mapDispatch = ({ systemManager }) => ({

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
    render: () => <a>Delete</a>,
  },
];
const SystemManager = (props) => {
const [state,setState] = useState({
  visible:false,
  loading:false
});

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

  const addUser = (<div>add</div>);
const handleOk = () => {
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
const handleCancel = () => {
  setState({
    ...state,
     visible: false 
    });
};
const openlayer = ()=>{
  setState({
    ...state,
     visible: true 
    });
}

  return (
    <div className="systemPage">
      <div>
        <div className="btn_wrap" onClick = {()=>openlayer()}>
          <Button type="primary" block={true}>
            <PlusOutlined />
                  新增
              </Button>
          
        </div>
        <Modal
            title="新增账号"
            visible={state.visible}
            closable={false}
            // onOk={this.handleOk}
            // onCancel={this.handleCancel}
            footer={[
              <Button key="submit" type="primary" loading={state.loading} onClick={() => handleOk()}>
                保存
                  </Button>,
              <Button key="back" onClick={() => handleCancel ()}>
                取消
                  </Button>,
            ]}
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
          dataSource={props.data}
          pagination={{ position: ['bottomRight'], pageSize: 2 }}
        />
      </div>

    </div>
  );
}



export default connect(
  mapState, mapDispatch
)(withRouter(SystemManager));