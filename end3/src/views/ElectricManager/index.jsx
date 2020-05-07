import React , { useEffect,useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table, Radio, Divider } from 'antd';

import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import './index.scss';
//4.1对应映射的字段 
const mapState = ({electricManager}) => ({

});
//4.2需要使用的http api接口 和 需要使用的方法
const mapDispatch = ( {electricManager} ) => ({

});

const ElectricManager = (props)=> {
    const columns = [
        {
          title: '宿舍编号',
          dataIndex: 'dormitoryId',
          align:"center"
          
        },
        {
          title: '历史度数',
          dataIndex: 'degreesHistory',
          align:"center"

        },
        {
          title: '当前度数',
          dataIndex: 'current',
          align:"center"

        },  {
          title: '余额',
          dataIndex: 'balance',
          align:"center"

        },
      ];
      const data = [
        {
          key: '1',
          dormitoryId: 101,
          degreesHistory: 100,
          current: 101,
          balance:1
        },
        {
          key: '2',
          dormitoryId: 101,
          degreesHistory: 100,
          current: 101,
          balance:1
        }, {
          key: '3',
          dormitoryId: 101,
          degreesHistory: 100,
          current: 101,
          balance:1
        }, {
          key: '4',
          dormitoryId: 101,
          degreesHistory: 100,
          current: 101,
          balance:1
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
)(withRouter(ElectricManager));