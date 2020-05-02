import reducers from './reducers';
import effects from './effects';

//3.2 定义store里面dispatch的字段
export const state = {
  
  data:[
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
  ]// rowSelection object indicates the need for row selection
   
};

export default {
  name: 'systemManager',
  state,
  reducers,
  effects
};
