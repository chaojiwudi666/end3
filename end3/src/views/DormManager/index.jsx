import React , { useEffect,useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table, Radio, Divider } from 'antd';

import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import './index.scss';
//4.1对应映射的字段 
const mapState = ({dormManager}) => ({

});
//4.2需要使用的http api接口 和 需要使用的方法
const mapDispatch = ( {dormManager} ) => ({

});

const DormManager = (props)=> {
    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          render: text => <a>{text}</a>,
        },
        {
          title: 'Age',
          dataIndex: 'age',
        },
        {
          title: 'Address',
          dataIndex: 'address',
        },
      ];
      const data = [
        {
          key: '1',
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
        },
        {
          key: '2',
          name: 'Jim Green',
          age: 42,
          address: 'London No. 1 Lake Park',
        },
        {
          key: '3',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
        },
        {
          key: '4',
          name: 'Disabled User',
          age: 99,
          address: 'Sidney No. 1 Lake Park',
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
      const [selectionType, setSelectionType] = useState('checkbox');

    return (
      <div className="addUserPage">
          <div>
            <Radio.Group
                onChange={({ target: { value } }) => {
                setSelectionType(value);
                }}
                value={selectionType}
            >
                <Radio value="checkbox">Checkbox</Radio>
                <Radio value="radio">radio</Radio>
            </Radio.Group>

            <Divider />

            <Table
                rowSelection={{
                type: selectionType,
                ...rowSelection,
                }}
                columns={columns}
                dataSource={data}
            />
            </div>
         
      </div>
    );
  }



export default connect(
  mapState, mapDispatch
)(withRouter(DormManager));